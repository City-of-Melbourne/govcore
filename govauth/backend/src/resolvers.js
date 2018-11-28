
module.exports = {
  Query: {
    Person: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ id }),
    Persons: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ bucket: "entities", type: "person" }),

    Service: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ id: id }),
    Services: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ bucket: "entities", type: "service" }),

    Role: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ id: id }),
    Roles: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ bucket: "entities", type: "role" }),

    Business: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ id: id }),
    Businesses: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ bucket: "entities", type: "business" }),

    Idp: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ id: id }),
    Idps: (_, __, { dataSources }) => dataSources.GovCoreApi.findDocument({ bucket: "entities", type: "idp" }),

    GraphEdge: (_, { id }, { dataSources }) => dataSources.GovCoreApi.getDocument({ id: id }),
    // HERE
    GraphEdges: (_, { type, a, b }, { dataSources }) => {

      return dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: type, a: a, b: b }).then(edge => { return Object.assign(edge, { a: dataSources.GovCoreApi.getDocument({ id: edge.a }), b: dataSources.GovCoreApi.getDocument({ id: edge.b }) }); })

    },
    BusinessServices: (_, { business, service }, { dataSources }) => {


      return dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: "business_service", business: business, service: service }).then(edges => {
        return edges.map(function (edge) { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), service: dataSources.GovCoreApi.getDocument({ id: edge.service }) }); });
      });

    },
    BusinessService: (_, { id }, { dataSources }) => {
      return dataSources.GovCoreApi.getDocument({ id: id }).then(edge => { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), service: dataSources.GovCoreApi.getDocument({ id: edge.service }) }); });
    },
    BusinessPersons: (_, { business, person }, { dataSources }) => {

      return dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: "business_person", business: business, person: person }).then(edges => {
        return edges.map(function (edge) { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), person: dataSources.GovCoreApi.getDocument({ id: edge.person }), role: dataSources.GovCoreApi.getDocument({ id: edge.role }) }); });
      });

    },
    BusinessPerson: (_, { id }, { dataSources }) => {

      return dataSources.GovCoreApi.getDocument({ id: id }).then(edge => { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), person: dataSources.GovCoreApi.getDocument({ id: edge.person }), role: dataSources.GovCoreApi.getDocument({ id: edge.role }) }); });

    },
    BusinessPersonRequests: (_, { type, business, person }, { dataSources }) => {

      return dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: type, a: business, b: person }).then(edges => {
        return edges.map(function (edge) { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), person: dataSources.GovCoreApi.getDocument({ id: edge.person }), role: dataSources.GovCoreApi.getDocument({ id: edge.role }) }); });
      });

    },
    BusinessPersonRequest: (_, { id }, { dataSources }) => {
      return dataSources.GovCoreApi.getDocument({ id: id }).then(edge => { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), person: dataSources.GovCoreApi.getDocument({ id: edge.person }), role: dataSources.GovCoreApi.getDocument({ id: edge.role }) }); });

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

    createGraphEdge: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'graph_edges'}), 
    deleteGraphEdge: (_, { id }, { dataSources }) => dataSources.GovCoreApi.deleteDocument({ id }),
    
    createBusinessService: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'graph_edges'}),
    createBusinessPerson: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'graph_edges'})

    

  }
};