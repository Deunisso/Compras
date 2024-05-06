document.addEventListener('DOMContentLoaded', function() {
    // ID da pasta "Cozinha" no Google Drive
    const folderId = '1r1Q6r2mf9iObPezoA65ddFb8-LJEqPie';

    // Função para listar arquivos dentro de uma pasta
    function listFilesInFolder(folderId) {
        const query = `'${folderId}' in parents and (mimeType='image/jpeg' or mimeType='image/png')`;

        // Faça uma solicitação para listar arquivos na pasta especificada
        gapi.client.drive.files.list({
            q: query,
            fields: "files(id, name, thumbnailLink)"
        }).then(function(response) {
            let images = response.result.files;
            // Ordene os arquivos em ordem alfabética pelo nome do arquivo
            images.sort((a, b) => a.name.localeCompare(b.name));
            // Loop através das imagens e exibi-las
            images.forEach(function(image) {
                // Crie um elemento de imagem
                const img = document.createElement('img');
                img.src = image.thumbnailLink; // Use thumbnailLink para visualização
                img.alt = image.name;

                // Remova a extensão do nome do arquivo
                const fileNameWithoutExtension = image.name.split('.').slice(0, -1).join('.');

                // Crie um elemento de parágrafo para exibir o nome da imagem
                const namePara = document.createElement('h3');
                namePara.textContent = fileNameWithoutExtension;

                // Crie um contêiner para a imagem e seu nome
                const container = document.createElement('div');
                container.classList.add('image');
                container.appendChild(img);
                container.appendChild(namePara);

                // Adicione o contêiner ao contêiner principal
                const mainContainer = document.getElementById('cozinhaContainer');
                mainContainer.appendChild(container);
            });
        });
    }

    // Inicialize o cliente da API do Google Drive
    gapi.load('client', function() {
        gapi.client.init({
            apiKey: 'AIzaSyB13rm0bnEiPHqVBtK8e2UmC9NvqwZioWI',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        }).then(function() {
            // Liste os arquivos na pasta "Cozinha"
            listFilesInFolder(folderId);
        });
    });
});
