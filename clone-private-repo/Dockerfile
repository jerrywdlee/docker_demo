# !! PLACE `KEY.pem` under same folder

FROM ubuntu
RUN apt-get update
RUN apt-get install -y openssl git

# FROM centos
# RUN yum update -y
# RUN yum install -y openssl git

# RUN git --version

WORKDIR /usr/src/app
# !! PLACE `KEY.pem` under same folder
COPY ./*.pem /usr/src/app/git-key.pem

# Create known_hosts & add bitbuckets
RUN mkdir /root/.ssh/ && touch /root/.ssh/known_hosts
RUN ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts
RUN ssh-keyscan -t rsa bitbucket.org >> /root/.ssh/known_hosts

# Clone with SSH
RUN chmod 600 /usr/src/app/git-key.pem
RUN ssh-agent bash -c 'ssh-add /usr/src/app/git-key.pem; git clone git@bitbucket.org:idoctor_dev/byouten-junior.git'

# Del key
RUN rm -rf /usr/src/app/git-key.pem

# confirm
RUN cd byouten-junior && ls -la
