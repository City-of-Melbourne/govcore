require 'json'

entities = [
  { id: 1,  type: "person",   name: "Person1"  },
  { id: 2,  type: "person",   name: "Person2"  },
  { id: 3,  type: "person",   name: "Person3"  },
  { id: 4,  type: "person",   name: "Person4"  },
  { id: 5,  type: "person",   name: "Person5"  },
  { id: 6,  type: "person",   name: "Person6"  },
  { id: 7,  type: "person",   name: "Person7"  },
  { id: 8,  type: "person",   name: "Person8"  },
  { id: 9,  type: "person",   name: "Person9"  },
  { id: 10, type: "business", name: "busines1" },
  { id: 11, type: "business", name: "busines2" },
  { id: 12, type: "business", name: "busines3" },
  { id: 13, type: "service",  name: "Wervice1" },
  { id: 14, type: "service",  name: "Service2" },
]

graph_edges = [
  [10, [1, 2]],
  [11, [3, 4, 5]],
  [12, [6 ,7 ,8 ,9]],
  [13, [10, 11]],
  [14, [10, 11, 12]],
  [13, [1, 2, 3, 4, 5]],
  [14, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
].map { |x, y|  [x].product(y) }
 .map do |x|
   x.map do |y|
     a = entities.find { |entity| entity[:id] == y[0] }
     b = entities.find { |entity| entity[:id] == y[1] }
     { 
         id: rand(15..10000),
         type: "#{a[:type]}_#{b[:type]}",
         a: y[0],
         b: y[1]
     }
   end
 end.flatten

events = (entities + graph_edges).map do |entity|
    {
        id: rand(15..10000),
        type: 'document_actity',
        name: 'created',
        document_id: entity[:id],
        date: Time.now,
    }
end

db = {
    entities: entities,
    graph_edges: graph_edges,
    events: events
}

puts JSON.generate(db)