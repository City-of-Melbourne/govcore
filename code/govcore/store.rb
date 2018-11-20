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

      if validate
        template = find(bucket, { bucket: "templates", type: doc[:type].to_s }).first

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

    def update(bucket, doc)
      doc_value = bucket.get(doc[:id])

      if doc_value == nil
        return nil, "Doc #{doc[:id]} not found."
      end

      # TODO Validate
      value = bucket.put(doc[:id], Doc.dump(doc))
      return Doc.parse(value), nil
    end

    def delete(bucket, doc_id)
      bucket.delete(doc_id)
    end

    def find(bucket, props)
      props = props.select { |_, v| v }

      all_docs = bucket.all.map { |doc| Doc.parse(doc) }

      props.keys.reduce(all_docs) do |docs, k|
        docs.select { |doc|  props[k] == doc[k] }
      end
    end

    private
    def random_id
      SecureRandom.hex
    end
  end
end