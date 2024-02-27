run:
	npm run dev

db:
	docker-compose -f ./build/docker-compose.yml up -d

seed:
	npm run seed