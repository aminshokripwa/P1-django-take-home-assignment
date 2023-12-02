import { App } from './app';
import { config } from 'dotenv';

const main = async() => {

    config();

    const app = new App();
    await app.listen(process.env.NODE_IN_DOCKER_PORT || '8080');

}

main();