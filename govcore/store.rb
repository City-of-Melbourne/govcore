require 'json'
require 'securerandom'
require 'json-schema'
require './doc'

class Store
  class << self
    def get(bucket, doc_id)
      value = bucket.get(doc_id)
      value ? Doc.parse(value) : nil
    end

    def create(bucket, doc, validate: true)
      doc = doc.clone
      doc[:id] = random_id

      new_doc, errors = put(bucket, doc, validate)

      if new_doc
        create_event(bucket, 'document_created', new_doc[:id])
      end

      return new_doc, errors
    end

    def update(bucket, doc, validate: true)
      doc_value = bucket.get(doc[:id])

      if doc_value == nil
        return nil, ["Doc #{doc[:id]} not found."]
      end

      new_doc, errors = put(bucket, doc, validate)

      if new_doc
        create_event(bucket, 'document_updated', new_doc[:id])
      end

      return new_doc, errors
    end

    def delete(bucket, doc_id)
      bucket.delete(doc_id)
      create_event(bucket, 'document_deleted', doc_id)
    end

    def find(bucket, props)
      props = props.select { |_, v| v }

      all_docs = bucket.all.map { |doc| Doc.parse(doc) }

      props.keys.reduce(all_docs) do |docs, k|
        docs.select { |doc|  props[k] == doc[k] }
      end
    end

    private

    def put(bucket, doc, validate)
      template = find(bucket, { bucket: "templates", type: doc[:type].to_s }).first

      # FIXME how should this be handled?
      validate = false if doc[:bucket] == 'templates'

      if validate
        if !template
          return nil, ["No template found for doc type #{doc['type']}."]
        end

        errors = JSON::Validator.fully_validate(template[:schema], doc)

        if errors.any?
          return nil, errors
        end
      end

      value = bucket.put(doc[:id], Doc.dump(doc))
      return Doc.parse(value), nil
    end

    def create_event(bucket, name, doc_id)
      t = Time.now

      event = Doc.dump({
        bucket: 'events',
        type: 'system',
        name: name,
        doc_id: doc_id,
        timestamp: t.to_i,
        human_time: t.to_s
      })

      bucket.put(random_id, event)
    end

    def random_id
      SecureRandom.hex
    end
  end
end