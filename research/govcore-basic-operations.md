# GovCore: Basic operations

https://trello.com/c/rIw63Htj

Define the interface/api to do basic operations on documents using our our data model.

Basic operations include:

- Create
- Read
- Update
- Delete

These need to work on our basic document types/collections/buckets:

- Templates
- Entities
- GraphEdges
- Events

> Requirement: Operations that modify state generate events.

Focus on the API/Interface.
Focus on getting data in and out.

Don't worry about where to store it.
Don't worry about data integrity.

The first approach is to get a set of functions that we can use in a JavaScript environment to play with an web interface.

---

Look at how others have done this.

Examples:

    CRUD          | create  | read      | update    | delete
    file system   | write   | read      | write     | delete
    http verbs    | post    | get       | patch     | delete    
    sql           | insert  | select    | update    | delete
    nosql (mongo) | insert  | query     | update    | delete
    hash/map      | set     | get       | set       | delete

So we have this basic operation, that at first sight look like low level stuff, but actually these are business requirements. Any database, file system can do thes things. The difference here is that we have very specific requirements about where and how to store the data, what happens when information get's modified.

But what are these requirements?

> Requirement: Data complies with the structure of a template

> Requirement: Data is stored in specific places (databases possibly more than one)

> Requirement: When some data is modified (events) we need to keep track of that

> Requirement: Data history is saved

> Requirement: Data history can be kept for ever

> Requirement: Data history can be deleted in special cases

Just to name a few. That's clearly a lot. So let's split this up and focus on one thing.

What are most fundamental parts that are common amongst all operation regardless of the rules?

- We need to store data in buckets
- We need to do basic crud operations

Once we have this we can build on top of that to apply more domain specific rules.

This is starting to look like file system almost where you have `directories (buckets)` and files `documents`

or

like an ORM that stores info in different databases.

Although not necessarily, each bucket could be stored different database so definitely need to make a distinction. Or do we?

Ok, let's start with the simple case. We this buckets are logical stores (directories/collections) and we have one database.

## Create

What would the api for the `create` operation look like?

What does create do?

Creates and stores a new document in our system.

And what do we need to know to create a document?

    - the contents
    - the place

It could be something like:

    create(entity, { type: person...})

We're saying create a `person` in the `entities` bucket

And that would create the entity with the given properties and somehow create the `uniq id`

    create(entity, { type: person, name: jimmi })

should return

    { id: 12987234, type: person, name: jimmi }

Two possible ways to create uniq ids, making a random `uuid` or using the `digest` of hashing the contents of the document, like `git` does it.

The digest could serve multiple purposes: 

1. Uniq id
2. Check equality of documents quickly
3. Check integrity of documents

So let's assume ids will be a hash of the contents. We will discuss how to do that later.

Our create function has these responsibilities:

1. decide in what bucket to store the doc
2. generate id by hashing the doc
3. add metadata: id, timestamps, etc
4. store the doc

in pseudocode:

    create(doc)
        id      = hash_function(doc)
        bucket  = bucket_for(doc)
        old_doc = bucket.get(id)
        
        if old_doc exists?
            return old_doc
        else
            new_doc = add_metadata(id: id, created_at: timestamp, doc)
            bucket.create(id, new_doc)
            
            return new_doc

and the should produce:

    {
        id: 12987234,
        create_at: 2018-10-19 11:37:33 +1100
        content: {
            type: person,
            name: jimmi 
        }
    }

We can think of the create operation as a orchestration function that takes a document and a well defined functions/objects that comply with an interface.

We don't care how `hash_function`, `bucket_for` and `add_metadata` do their job as long as they have the same interface.

That way we can easily swap databases/buckets by providing different `adapters`.

And to ensure we keep things decouples we could pass all the dependencies to the function itself like so:

    create(hash_function, bucket_for, add_metadata, doc)

or make a function preloaded with that:

    create = make_create_function(hash_function, bucket_for, add_metadata)

then use it

    create(doc) -> doc

Going through this process I just realised that a few of previous assumptions might be wrong:

> Ids are numbers

Because the digest of some hashing like SHA256 (git) contain numbers and letters the new assumption is:

> Assumption: ids are the digest of the doc

Another assumption was:

> Documents don't need a document_type

Because now we're saying that the create function has to figure out where to store the document we somehow need to infer that from somewhere. We can either request that information upfront

    create(doc, bucket)

or infer it from the doc itself:

    create(doc)
        bucket = bucket_for(doc.doc_type)

I can't tell what's better yet, let's leave it as an unknown

> Unknown: Where should the document_type live

Also the problem we're tackling right now is lowest level crud/io operations.

    Client -> HTTP API -> GovCoreRules ->  GovCoreCRUD -> Bucket -> DB
                                                 👆
                                             We are here

So before we hit our basic `create` we need to do a bunch of other things like

- Document Validation/Building from Templates
- Access Control

So let's assume that the decision on where things go is done before we call `create`. That way we can remove remove the "decide in what bucket to store the doc" responsibility.

Update: Our create function has these responsibilities:

1. generate id by hashing the doc
2. add metadata: id, timestamps, etc
3. serialise
3. store the doc

So we can remove one thing from the interface:

    create(hash_function, bucket, add_metadata, doc) -> doc

and the an implementation could look like this:

    create(hash_function, bucket, add_metadata, doc)
        id      = hash_function(doc)
        old_doc = bucket.get(id)
        
        if old_doc exists?
            return old_doc
        else
            new_doc = add_metadata(id: id, created_at: timestamp, doc)
            bucket.create(id, new_doc)
            return new_doc

I'm happy with that.

## Read/Get

What does read do?

It gets/retrieves/reads documents from buckets

What do we need to do that?

At least the  `id` and the `bucket`

    get(bucket, id) -> doc
        bucket.get(id)

That seems unnecessary. if the bucket function/object already has a get method, why do we need a wrapper?

I don't know yet.

Maybe so that we can handle errors in standard way?

Maybe to convert the data to the format we're expecting?

Let's see, so far we haven't specified how `bucket` works. We only know that it gets and creates stuff from a data store/database. However we haven't say how to store the data or wether we want to store it as JSON or anther format.

The bucket acts as an I/O device in operating system terms. It doesn't care about the shape of the data.

But we do care about the shape. So the next question is: who's responsibility is it to transform the output from the bucket into the proper format?

This is what the overall I/O of the system looks like:

    Client → HTTP API → GovCoreRules →  GovCoreCRUD → DBAdapter → DDB

Let's expand this and try to figure out that's the shape of the data on each arrow:
    
    Client  →  HTTP API  →  GovCoreRules  →  GovCoreCRUD  →  Bucket  →  DB
          JSON         struct           struct         key/value  key/value

And the other way around (read):

    
    Client ← HTTP API ← GovCoreRules ← GovCoreCRUD ← Bucket ← DB
          JSON      struct          struct         value    value

It seems like the conversion should happen at GovCoreCRUD level.

Why?

Because this allows Buckets/Adapters to be less coupled to GovCore thus easier to be implemented

Also makes GovCore more flexible because we can change the format we want to use in a single place `GovCoreCRUD` rather than at the adapter level.

Does that sound reasonable?

Yes. We have clear separation of concerns:

    GovCoreCRUD: Orchestrate data Store/Retrieval the "govcore way"
    Bucket:      Store/Retrieve data (any shape) in a particular place/database

Ok, Now that we know this, what would the get function look like?

    get(bucket, unserialize, id) -> doc
        string = bucket.get(id)
        return serialize(string)

This way, we can change what `serialize` function does without affecting the underlying logic. Or at least that's the promise.

And the reason this is a good thing is because GovCore is agnostic of serialisation formats. Today we might want to store document as JSON but tomorrow we might want to use XML or the format "du jour".

## Create (Updated)

Similarly, we need to update the create function to reflect the fact the it also has the responsibility of coordinating serialisation:

    create(bucket, hash, serialize, add_metadata, doc)
        id      = hash(doc)
        old_doc = bucket.get(id)
        
        if old_doc exists?
            return serialize(old_doc)
        else
            new_doc = add_metadata(id: id, created_at: timestamp, doc)
            serialise_doc = serialize(new_doc)
            bucket.create(id, serialise_doc)
            return new_doc

## Update

The update operation is almost the same as create with the exception that the doc must exists before we do the operation:

    update(bucket, create, hash, serialize, add_metadata, doc)
        old_doc = bucket.get(doc.id)

        if old_doc doesn't exists?
            error
        else
            return create(bucket, hash, serialize, add_metadata, doc)

This update is different that the traditional update in the sense that we're not updating documents in place. Instead, we're creating a new version of the document.

This raises the question:

> Unknown: How can we tell when two documents are different versions of the same "same" thing?

I don't know yet, but I think this should be answered at the next level up the chain.

## Delete

    delete(bucket, id)
        bucket.delete(id)

🤔 doesn't seem right

Why do we need this layer of abstraction?

I don't know. And I think we need to start working with real examples to how all this might work together.

Maybe we need to give the crud operations more responsibilities and rely a bit more on the bucket interface

# Conclusion

Responsibilities of GovCoreCRUD are:

1. Coordinate id generation
2. Coordinate metadata update
3. Coordinate serialisation/deserialisation
3. Coordinate store/retrieve/delete

And the most most basic interfaces would look like this:

    create(bucket, hash, serialize, add_metadata, doc) -> doc

    get(bucket, unserialize, id) -> doc

    update(bucket, create, hash, serialize, add_metadata, doc) -> doc

    delete(bucket, id)