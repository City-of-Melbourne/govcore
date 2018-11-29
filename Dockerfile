FROM ruby:2.5-stretch

# Install FoundationDB
RUN wget -O fdb-clients.deb https://www.foundationdb.org/downloads/6.0.15/ubuntu/installers/foundationdb-clients_6.0.15-1_amd64.deb \
    && wget -O fdb-server.deb https://www.foundationdb.org/downloads/6.0.15/ubuntu/installers/foundationdb-server_6.0.15-1_amd64.deb \
    && dpkg -i fdb-clients.deb fdb-server.deb \
    && rm fdb-clients.deb \
    && rm fdb-server.deb

# Install Node
RUN apt-get update \
    && curl -sL https://deb.nodesource.com/setup_11.x | bash - \
    && apt-get install -y nodejs

# Copy current directory into container at /govcore
COPY . /govcore
#
# Install GovCore dependencies
RUN cd /govcore/govcore \
    && bundle install

# Install GovAuth Backend dependencies
RUN cd /govcore/govauth/backend \
    && npm install

# Install GovAuth Frontend dependencies
RUN cd /govcore/govauth/frontend \
    && npm install

# Install GovAuth Frontend dependencies
RUN cd /govcore/govbox \
    && npm install

# GovCore API port
EXPOSE 8001

# GovAuth Backend port
EXPOSE 8002

# GovAuth Frontend port
EXPOSE 8003

# GovBox port
EXPOSE 8004

# Start FoundationDB
CMD /govcore/start