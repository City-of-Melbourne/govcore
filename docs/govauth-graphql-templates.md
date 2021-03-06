# Gov Auth Templates Using GraphQL Schema Definition Language + GovCore Template Definition

After had played  few days with grapQL, we come up with the following templates that reflects the problem domain(GovAuth)


    type GraphEdge {
        id: ID!
        type: String
        a: Int
        b: Int
    }
    type Person {
        id: ID,
        name: String
        email: String
    }
    type Service {
        
        id: ID,
        name: String
    }
    type Business {
        id: ID,
        name: String
        abn: String
    }
    type Event {
        id: ID!,
        type: String
        name: String
        document_id: String
        date: String
    }
    type Idp {
        id: ID
        name: String
    }
    input PersonInput {
        id: ID,
            name: String
        email: String
    }
    input ServiceInput {
        id: ID,
            name: String
    }
    input BusinessInput {
        id: ID,
            name: String
        abn: String
    }
    input IdpInput {
        id: ID
        name: String
    }
    input GraphEdgeInput {
        id: ID
        type: String
        a: Int
        b: Int
    }



    type Query {

        Person(id: ID!): Person
        Persons(limit: Int): [Person]

        Service(id: ID!): Service
        Services(limit: Int): [Service]

        Business(id: ID!): Business
        Businesses(limit: Int): [Business]

        Idp(id: ID!): Idp
        Idps(limit: Int): [Idp]

        GraphEdges(limit: Int, type: String, a: Int, b: Int): [GraphEdge]
        GraphEdge(type: String, a: Int): GraphEdge
    }

    type Mutation {

        createPerson(input: PersonInput): Person
        updatePerson(input: PersonInput): Person
        createService(input: ServiceInput): Service
        updateService(input: ServiceInput): Service
        createBusiness(input: BusinessInput): Business
        updateBusiness(input: BusinessInput): Business

        createIdp(input: IdpInput): Idp
        updateIdp(input: IdpInput): Idp
        createGraphEdge(input: GraphEdgeInput): GraphEdge



    }
