FROM node:10.15.3-alpine
LABEL maintainer="Iuliana Augusta <iuliana.augusta@gmail.com>"
RUN set -x && apk update && apk upgrade \
  && apk add --no-cache openssh openrc

# For debug
# RUN apk add --no-cache bash vim

RUN rc-update add sshd && rc-status
RUN mkdir -p /run/openrc/ && touch /run/openrc/softlevel
# SEE https://wiki.alpinelinux.org/wiki/Setting_up_a_ssh-server
# https://blog.adachin.me/archives/4177

RUN adduser -D ssh-user
# It will cause an ssh login error if user has no password
RUN echo "ssh-user:ssh-pass" | chpasswd
# If need sudo
# RUN apk add --no-cache sudo
# RUN echo "ssh-user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER ssh-user
RUN mkdir $HOME/.ssh
RUN ssh-keygen -m PEM -t rsa -b 1024 -C "ssh-user@example.com" -N "" -f $HOME/.ssh/id_rsa
RUN cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys

USER root
RUN cp /home/ssh-user/.ssh/id_rsa $HOME/ssh-user.pem

CMD /etc/init.d/sshd start && tail -f /dev/null
