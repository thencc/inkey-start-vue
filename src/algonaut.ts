import Algonaut from '@thencc/algonautjs'
import config from './algonaut.config.json'

export const algonaut = new Algonaut({
    BASE_SERVER: config.BASE_SERVER,
    INDEX_SERVER: config.INDEX_SERVER,
    PORT: config.PORT,
    LEDGER: config.LEDGER,
    API_TOKEN: config.API_TOKEN,
    SIGNING_MODE: 'inkey'
})