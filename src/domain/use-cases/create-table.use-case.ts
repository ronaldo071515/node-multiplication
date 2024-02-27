
export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase {

    constructor(
        /**
         * DI - Dependency Injection
        */
    ){}

    execute( { base, limit = 10 }: CreateTableOptions ) {/* ejecutamos el caso de uso */
        let outputMessage = ''
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${ base } x ${ i } = ${ base * i }\n`;
        }

        return outputMessage;
    }

}