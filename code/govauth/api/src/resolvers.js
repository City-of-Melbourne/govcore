
module.exports = {
  Query: {
    Person: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ Id: id }),
    Persons: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ Bucket: "Entity", Type: "person" }),

    Service: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ Id: id }),
    Services: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ Bucket: "Entity", Type: "service" }),

    Role: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ Id: id }),
    Roles: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ Bucket: "Entity", Type: "role" }),

    Business: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ Id: id }),
    Businesses: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ Bucket: "Entity", Type: "business" }),

    Idp: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ Id: id }),
    Idps: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ Bucket: "Entity", Type: "idp" }),

    GraphEdge: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ Id: id }),

    // HERE
    GraphEdges: (_, { type, a, b }, { dataSources }) => {

      var edge = dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: type, a: a, b: b })
      var a = dataSources.GovCoreApi.getDocument({ Id: edge.a });
      var b = dataSources.GovCoreApi.getDocument({ Id: edge.b });
      return Object.assign(edge, { a: a, b: b });
    },
    
    BusinessServices: (_, { business, service }, { dataSources }) => {

      var edges = dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: "business_service", a: business, b: service })

      return edges.map(function (edge) {
        return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ Id: edge.a }), service: dataSources.GovCoreApi.getDocument({ Id: edge.b }) });
      })
    },
    BusinessService: (_, { id }, { dataSources }) => {

      var edge = dataSources.GovCoreApi.getDocument({ Id: id });
      return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ Id: edge.a }), service: dataSources.GovCoreApi.getDocument({ Id: edge.b }) });
    },
    BusinessPersons: (_, { business, person }, { dataSources }) => {

      var edges = dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: "business_person", a: business, b: person })
      return edges.map(function (edge) {
        return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ Id: edge.a }), person: dataSources.GovCoreApi.getDocument({ Id: edge.b }), role: dataSources.GovCoreApi.getDocument({ Id: edge.role }) });
      })

    },
    BusinessPerson: (_, { id }, { dataSources }) => {

      var edge = dataSources.GovCoreApi.getDocument({ Id: id });
      return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ Id: edge.a }), person: dataSources.GovCoreApi.getDocument({ Id: edge.b }), role: dataSources.GovCoreApi.getDocument({ Id: edge.role }) });

    },
    BusinessPersonRequests: (_, { type, business, person }, { dataSources }) => {
      var edges = db.find({ bucket: "graph_edges", type: type, a: business, b: person })

      return edges.map(function (edge) {
        return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ Id: edge.a }), person: dataSources.GovCoreApi.getDocument({ Id: edge.b }), role: dataSources.GovCoreApi.getDocument({ Id: edge.role }) });
      })
    },
    BusinessPersonRequest: (_, { id }, { dataSources }) => {

      var edge = dataSources.GovCoreApi.getDocument({ Id: id });
      return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ Id: edge.a }), person: dataSources.GovCoreApi.getDocument({ Id: edge.b }), role: dataSources.GovCoreApi.getDocument({ Id: edge.role }) });
    }



  },
  Mutation: {
    createPerson: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({ Input: input, bucket: 'entities', type: 'person' }),
    updatePerson: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({ Input: input, bucket: 'entities', type: 'person' }),

    createService: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({ Input: input, bucket: 'entities', type: 'service' }),
    updateService: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({ Input: input, bucket: 'entities', type: 'service' }),

    createBusiness: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({ Input: input, bucket: 'entities', type: 'business' }),
    updateBusiness: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({ Input: input, bucket: 'entities', type: 'business' }),

    createIdp: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({ Input: input, bucket: 'entities', type: 'idp' }),
    updateIdp: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({ Input: input, bucket: 'entities', type: 'idp' }),

    createGraphEdge: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({ Input: input, bucket: 'graph_edges' }),
    deleteGraphEdge: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({ Input: input, bucket: 'graph_edges' })


  }
};