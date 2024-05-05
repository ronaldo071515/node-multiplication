import fs from 'fs';
import { SaveFile } from './save-file.use-case';


describe('save-file.use-case', () => {

    /* cliclo de vida: beforeEach */
    beforeEach(() => {
        //clean up
        fs.rmSync('outputs', { recursive: true });
    });
    const customOptions =  {
        fileContent : 'custom content',
        fileDestination : 'custom-outputs/file-destination',
        fileName : 'custom-table-name', 
    }
    
    const customFilePath = `${ customOptions.fileDestination }/${ customOptions.fileName }.txt`; 

    // beforeEach( () => {
    //     jest.clearAllMocks();
    // })

    /* cliclo de vida: afterEach */
    afterEach(() => {
        const outputFolderExits = fs.existsSync('outputs');
        if( outputFolderExits ) fs.rmSync('outputs', { recursive: true });
        const customOutputFolderExits = fs.existsSync(customOptions.fileDestination);
        if( customOutputFolderExits ) fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('should save file with default values', () => {
        
        const saveFile = new SaveFile();
        const filePath ='outputs/table.txt'; 
        const options = {
            fileContent: 'test-content'
        }

        const result = saveFile.execute(options);

        const fileExist = fs.existsSync(filePath);//puede dar falso positivo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect( result ).toBeTruthy();
        expect( fileExist ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );

    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);

        const fileExist = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect( result ).toBeTruthy();
        expect( fileExist ).toBeTruthy();
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        //mocks o spy's en jest para simular errores y con el metodo .mockImplementation sigifica que quiero sobreescribir esa funcionalidad que viene en el método por la implementación que le voy a dar.
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );

        const result = saveFile.execute(customOptions);

        expect( result ).toBe( false );

        //limpieza manual para un .mockImplementation
        mkdirSpy.mockRestore();

    });

    test('should return false if file could not be created', () => {
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message') }
        );

        const result = saveFile.execute({fileContent: 'hola'});

        expect( result ).toBe( false );

        writeFileSpy.mockRestore();

    });

});