# NodeJs GraphQL

### Este é um projeto inicial para o hand-on de GraphQL na FCamara

Para começar a desenvolver imediatamente:
* [Nodejs](https://nodejs.org/en/)
* Mogodb instalado na maquina ou [Mlab](https://mlab.com/), é possível criar uma instância gratuito 
* Ferramento para gerenciamento do mongodb [RoboMongo](https://robomongo.org/)

    * Instalar todas as dependências do projeto `npm install`
    * Iniciar o servidor de desenvolvimento `npm run dev`

## Que tem aqui
```bash
├── README.md - Este aquivo.
├── package.json # npm package manager file. 
├── .babelrc # usado principalmente para converter o código ECMAScript 2015+ em uma versão compatível com versões anteriores do JavaScript.
└── src
    ├── graphql 
    |    ├── resolvers.js # funções que foram definidas no schema
    │    ├── schema.graphql # schema da API com GraphQL   
    └── index.js # Configurações para inicializar a API
```

[Apresentação](https://drive.google.com/open?id=1viUT0z4XnDT0ba60haKwxWlvzqHjvOkT) 
