# Demo Docker Compose
## Commands
### Start
```sh
# as console
docker-compose up
# as daemon
docker-compose start
```

### Stop
```sh
docker-compose stop
```

### SSH
```sh
# Nginx
docker exec -it nginx-app bash
# Node
docker exec -it node-app bash
```

### Purge
```sh
# volumes
docker volume prune
# All
docker system prune
```

## URLs
- http://localhost:8080/
- http://localhost:8080/node/ <= Trailing slash needed
- http://localhost:8080/node/api
- http://localhost:8080/node/api/anyword
