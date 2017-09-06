# nnan suggest service

## What's this for?

NNAN suggest service


## How to deploy

You'll need AWS credentials (e.g. API Key) since it's based on various aws products like lambda/api gateway

Please refer [this doc](https://serverless.com/framework/docs/providers/aws/guide/credentials/) for serverless configuration

### Production

> $ vi env/prod.yml # edit configuration
>
> $ npm run deploy:prod


### Staging

> $ vi env/stage.yml # edit configuration
>
> $ npm run deploy:stage

Done!

## Credits

Since this service based on microservice template of Vingle.
For further details, Please see [balmbees/lambda-microservice-template](https://github.com/balmbees/lambda-microservice-template)

## License

MIT License / [mooyoul.mit-license.org](https://mooyoul.mit-license.org)

