'use strict';

const DotEnv = require('dotenv');
const Example = require('../../lib/example');
const Path = require('path');

describe('Example', () => {

    const envFile = Path.join('test', 'support', 'fixtures', '.env');
    const exampleFile = Path.join('test', 'support', 'fixtures', '.env.example');

    describe('#read', () => {

        it('reads variables', (done) => {

            const variables = Example.read(exampleFile);

            expect(variables).to.include([
                'NODE_ENV', 'DATABASE_URL', 'REDIS_URL', 'SERVICE_URL',
                'SERVICE_DOMAIN', 'SERVICE_HOST', 'SERVICE_HOSTNAME',
                'PORT', 'SERVICE_PORT'
            ]);
            done();
        });
    });

    describe('#hasMissingVariables', () => {

        beforeEach((done) => {

            DotEnv.config({ path: envFile });
            done();
        });

        context('when all vars are present', () => {

            it('returns false', (done) => {

                expect(Example.hasMissingVariables(exampleFile)).to.be.false();
                done();
            });
        });

        context('when some vars are missing', () => {

            it('returns missing var names', (done) => {

                delete process.env.REDIS_URL;
                delete process.env.PORT;

                expect(Example.hasMissingVariables(exampleFile))
                    .to.only.include(['REDIS_URL', 'PORT']);
                done();
            });
        });

        context('when .env.example does not exists', () => {

            it('throws a file not found error', (done) => {

                const fn = () => Example.hasMissingVariables('.env.sample');
                expect(fn).to.throw(Error, /ENOENT/);
                done();
            });
        });
    });
});
