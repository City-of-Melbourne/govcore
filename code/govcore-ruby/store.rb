require 'json'
require 'securerandom'
require 'irb'

class Store
  class << self
    def get(bucket, doc_id)
      value = bucket.get(doc_id)
      value ? JSON.parse(value) : nil
    end

    def create(bucket, doc)
      # TODO Validate
      doc['id'] = random_id
      value = bucket.put(doc['id'], JSON.dump(doc))
      return JSON.parse(value), nil
    end

    def update(bucket, doc)
      doc_value = bucket.get(doc['id'])

      if doc_value == nil
        return nil, "Doc #{doc['id']} not found."
      end

      # TODO Validate
      value = bucket.put(doc['id'], JSON.dump(doc))
      return JSON.parse(value), nil
    end

    def delete(bucket, doc_id)
      bucket.delete(doc_id)
    end

    def find(bucket, props)
      props = props.select { |_, v| v }

      all_docs = bucket.all.map { |doc| JSON.parse(doc) }

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