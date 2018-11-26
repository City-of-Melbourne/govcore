if ARGV.include?('--daemon')
  ARGV.delete('--daemon')
  Process.daemon(true)
end

require 'rack/cors'
require 'sinatra'
require './fdb_bucket'
require './doc'
require './store'

set :server, 'webrick'
set :bind, '0.0.0.0'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', methods: [:get, :post, :delete, :put, :patch, :options, :head]
  end
end

before { content_type :json }

def bucket
  FDBBucket.new(FDBBucket.db_open, 'docs')
end

get '/' do
  JSON.dump({ description: 'GovCore Rest API' })
end

get '/doc/:id' do
  doc = Store.get(bucket, params[:id])
  if doc
    JSON.dump(doc)
  else
    status 404
    JSON.dump({error: 'Not Found'})
  end
end

post '/doc' do
  data = Doc.parse(request.body.read)

  doc, error = Store.create(bucket, data)

  if error
    return JSON.dump({ error: error })
  end

  JSON.dump(doc)
end

put '/doc' do
  data = Doc.parse(request.body.read)

  doc, error = Store.update(bucket, data)

  if error
    return JSON.dump({ error: error })
  end

  JSON.dump(doc)
end

delete '/doc/:id' do
  Store.delete(bucket, params[:id])
  '{}'
end

get '/find/:props' do
  props = Doc.parse(params[:props])
  docs = Store.find(bucket, props)
  JSON.dump(docs)
end
