
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

      return dataSources.GovCoreApi.findDocument({ bucket: "graph_edges", type: type, business: business, person: person }).then(edges => {
        return edges.map(function (edge) { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), person: dataSources.GovCoreApi.getDocument({ id: edge.person }), role: dataSources.GovCoreApi.getDocument({ id: edge.role }) }); });
      });

    },
    BusinessPersonRequest: (_, { id }, { dataSources }) => {
      return dataSources.GovCoreApi.getDocument({ id: id }).then(edge => { return Object.assign(edge, { business: dataSources.GovCoreApi.getDocument({ id: edge.business }), person: dataSources.GovCoreApi.getDocument({ id: edge.person }), role: dataSources.GovCoreApi.getDocument({ id: edge.role }) }); });

    }
  },
  Mutation: {

    createPerson: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({ input, bucket: 'entities'}),
    updatePerson: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({ input, bucket: 'entities' }),

    createService: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({ input, bucket: 'entities'}),
    updateService: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({  input, bucket: 'entities'}),
    createBusiness: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'entities' }),
    updateBusiness: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({  input, bucket: 'entities'}),

    createIdp: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'entities' }),
    updateIdp: (_, { input }, { dataSources }) => dataSources.GovCoreApi.updateDocument({  input, bucket: 'entities' }),

    createGraphEdge: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'graph_edges'}), 
    deleteGraphEdge: (_, { id }, { dataSources }) => dataSources.GovCoreApi.deleteDocument({ id }),
    
    createBusinessService: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'graph_edges'}),
    createBusinessPerson: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'graph_edges'}),
    createPersonBusinessRequest: (_, { input }, { dataSources }) => dataSources.GovCoreApi.createDocument({  input, bucket: 'graph_edges'})

    

  }
};