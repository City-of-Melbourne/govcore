![Govcore](docs/assets/1-govcore-intro.png)

GovCore is information management system to run councils.

It tries to address these problems:

- Satisfying audit
- Supporting flexibility and continuous improvement
- Resilience and scale in deployment options
- Onboarding new functions and organisations (data migration)
- Managing attachments like images, documents and records
- Embedding spatial mapping
- Managing roles and responsibilities
- Adopting international and industry standards
- Satisfying records management obligations

Read the [GovCore Concept](docs/govcore.md) for a more detailed description.

## About the Project

This project is the first attempt to realise Simons's vision of GovCore.

It was a six-week experiment ran at the City Of Melbourne by [CodeForAustralia](https://codeforaustralia.org/) fellows Jonathan Castillo Bello and Victor Nava under the guidance and support of Simon Weller, Daniella Mazzone and Colin Fairweather.

The main goal of the project was to demonstrate that:

1. A system following GovCore principles could be built
2. Such system is a good option for building of apps for council

To achieve that, we built these prototypes:

- [GovCore](govcore/): JSON Document/Template store accesible via HTTP API
- [GovAuth](govauth/): An authorization system for CoM clients to login into CoM services.
- [GovBox](govbox/): Web client to manage/explore GovCore

[TODO: diagram of what we built and how it's connected]

TODO: that was the result?

## TODO: Spec (Blueprint)

TODO: put on a separate document?

Define distill the GovCore Way...

The [GovCore Concept](docs/govcore.md) sets the Vision/Goals. We need to go down one level and specify the concept in more detail. We need to include enough information to able to implement GovCore in any platform/database/language.

GovCore stores its data in key/value pair documents in human readable format.

GovCore is composed of layers:

- Rest API
- Access Control
- Workflow Management/Runner
- Data Store Logic
- Data Store Adapters (Document, Graph and Log)

## Implementation Notes

TODO: Review focus on GovCore/GovAuth

- [GovAuth Graphql Templates](docs/govauth-graphql-templates.md)
- [GovAuth Model](docs/govauth-model.md)
- [GraphQL](docs/graphQL.md)
- [Graphs](docs/graphs.md)
- [Model Representation](docs/model-representation.md)
- [Template Representation](docs/template-representation.md)
- [Template Validation](docs/template-validation.md)
- [Basic Operations](docs/basic-operations.md)

## Features List

- [x] Basic Rest API
- [x] CRUD Documents: Entities, Graph
- [x] Data validation with Template Documents
- [x] Store Events on data changes
- [ ] Versioning
- [ ] Access Control
- [ ] Workflow Engine
- [ ] Generic Client
- [ ] Data importing tools

## Roadmap

    Research → Prototype → Real world build → Real world use
                  👆
              You are here

- [x] Basic Prototype: CRUD Docs, Graph, Logs, Templates, Validation
- [x] Prototype GovAuth (App that runs on GovCore)
- [x] Prototype GovCore client (App that runs on GovCore)
- [ ] Get funding 💰
- [ ] Prototype extended features (Versioning, Access Control, Workflows, Security)
- [ ] Go to production with small real world case
- [ ] Improve from experience
- [ ] Get more funding 💰
- [ ] Build a few more clients (Scale)
- [ ] Build a few more database adapters (SQL, Salesforce)
- [ ] Improve from experience
- [ ] Get more funding 💰
- [ ] Marketplace: Build services for other gov agencies
- [ ] Offer training
- [ ] Stat GovCore foundation 😊
