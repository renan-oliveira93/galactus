run:
	docker compose up

generate:
	# generate migrations
	npx prisma generate

migrate:
	# runnin migrations
	npx prisma migrate dev