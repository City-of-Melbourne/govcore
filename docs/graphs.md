## Definition

A set of of ___vertices/nodes/vertx___ and ___edges/arcs use___ used to model  pairwise relations between objects

https://www.cs.cmu.edu/~adamchik/21-127/lectures/graphs_1_print.pdf

## Examples in real life
- Internet
- Networks
- Program Structure (Compiling)

## Types 

### Undirected

- Simple
- MultiGraph
- PseudoGraph

## Directed(consist of nodes and ordered pairs of edges )
- Multigraph
- PseudoGraph

___A graph might contains nodes with directed and undirected edges -> Mixed Graph___

## Representations

- Adjacency List

- Adjacency Matrix

## Aplications

- Computer Science
- Linguistics
- Biology
- Social Sciences


# Graphs - Graph Database

___If you can whiteboard it, you can graph it___

- Is a type of NoSql
- Uses graph theory ___(mentioned above)___ to store, map and query relationships.

### Pros

- Uses graph theory to  store,map and query relationships
- Is a type of NoSql
- Useful to work with Data that involves  complex relationships and dynamic schema


### Cons

- Inappropriate for transactional information, like accounting records where relationships between records are simpler
- Harder to do summing queries and max queries efficiently - counting queries not harder
- Usually need to learn a new query language like CIPHER
- Fewer vendors to choose from, and smaller user base, so harder to get support when you run into issues

## Candidates

- Neo4j
- OrientDB
- MondoDB
- ArangoDB

## Benchmarks

In order to find a candidate to support GovCore we went thoroughly through different benchmarks


### Titan vs OrientDb Vs Neo4J 

https://www.researchgate.net/publication/278680514_Benchmarking_Graph_Databases_on_the_Problem_of_Community_Detection

### Titan

Pros
- Scalable  Graph Database 
- Open Source

Cons
- Inactive from 2015
- Optimized for storing and querying graphs containing hundreds of billions of vertices and edges distributed across a multi-machine cluster

### OrientDb

- The License is GPL but the offers an enterprise edition


### Neo4J

Pros

- Open Source 
- The License is GPL but the offers an enterprise edition
- Creates a SQL based query language called Cypher
- The community has developed support for several languages

Cons

- There is one enterprise edition 

https://neo4j.com/licensing/

https://neo4j.com/developer/cypher-query-language/

https://neo4j.com/developer/ruby/

to take into account 

https://hackernoon.com/life-after-1-year-of-using-neo4j-4eca5ce95bf5


## RDBMS THAT SUPPORT GRAPHS

With less perfomance

- Sql server 2017
- PostGres
- MongoDb


# Visualization Libraries and sdk's

http://visjs.org

https://gephi.org

https://neo4j.com/developer/guide-data-visualization/

Oxford institute - Interactive Vis (2012)

https://github.com/oxfordinternetinstitute/InteractiveVis/blob/master/README


Sigma javascript library

http://sigmajs.org

Javascript Graph Drawing Libraries

https://github.com/anvaka/graph-drawing-libraries


