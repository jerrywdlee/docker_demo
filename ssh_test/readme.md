# ssh-test

```sh
# Login to container
$ docker exec -it ssh-test sh

# Write key to ./key.pem
$ docker exec ssh-test cat /root/ssh-user.pem > ssh-user.pem && chmod 600 ssh-user.pem

$ ssh -i ssh-user.pem ssh-user@localhost -p 20022
```
