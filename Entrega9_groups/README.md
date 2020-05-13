
<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="60" style="float: right;" src="http://www.dit.upm.es/figures/logos/ditupm-big.gif">

<br/><br/><br/>

# Entrega 9: Quiz Groups

Versión: 2 de Abril de 2020

## Objetivos

* Afianzar sus conocimientos en el uso de Express para desarrollar servidores web.

## Descripción de la práctica

En esta practica el alumno debe modificar el proyecto **Quiz** desarrollado en la asignatura para añadir un nuevo recurso que represente grupos de quizzes, y que permita jugar a **Random Play** con los quizzes de un grupo. 

La idea es que un grupo contenga los quizzes relacionados con un mismo tema. Se tendría un grupo para los quizzes de geografía, otro para los de matemáticas, otro para historia, otro para deportes, etc. 

El alumno debe desarrollar:

* Todos los elementos necesarios (CRUD) para manejar los grupos, es decir, poder listar los grupos existentes, crear nuevos grupos, editarlos y borrarlos.
* Añadir la funcionalidad **Random Play** desarrollada en la entrega 8 a los grupos, es decir, se jugaría a contestar solo a los quizzes de un grupo, que se presentarían de forma aleatoria y sin repeticiones.
* Añadir soporte de roles para que los únicos usuarios que pueden crear, editar y borrar los grupos sean los administradores. El resto de usuarios solo pueden consultar y jugar a los grupos.


Para desarrollar esta practica el alumno debe completar estas tareas:

* Tarea 1: Clonarse el proyecto **Quit** de la asignatura y crear una rama para desarrollar esta práctica.

* Tarea 2: Crear un botón llamado **Groups** en la barra de navegación del layout de la aplicacion.

* Tarea 3: Definir el modelo **Group**.

    * Definir una relación NaN entre los modelos **Group** y **Quiz**: un grupo contiene varios quizzes, y un quiz puede pertenecer a varios grupos.

    * Implementar las migraciones que crean la tabla **Groups** y la tabla join **GroupQuizzes**.

    * Implementar un fichero seeder que cree varios grupos y los asocie con los quizzes relacionados.

* Tarea 4: Definir las rutas necesarias:

```text
GET    /groups               ## Pedir listado de grupos.
GET    /groups/new           ## Pedir formulario para crear un grupo.
POST   /groups               ## Crear un grupo.
GET    /groups/:groupId/edit ## Pedir formulario para editar un grupo.
PUT    /groups/:groupId      ## Actualizar un grupo.
DELETE /groups/:groupId      ## Borrar un grupo.
    
GET   /groups/:groupId/randomplay                           ## Jugar con un grupo.
GET   /groups/:groupId/randomcheck/:quizId?answer=respuesta ## Comprobar respuesta
```

   * Añadir la ruta **"/groups"** a las rutas de restauración para que la redirección **"/goback"** permita volver al listado de grupos.

* Tarea 5: Crear las siguientes vistas:

    * **views/groups/index.ejs**: muestra un listado con todos los grupos. Contiene enlaces para jugar a un grupo, editarlo, borrarlo o crear un grupo nuevo.
    * **views/groups/new.ejs**: presenta un formulario para crear un grupo nuevo.
    * **views/groups/edit.ejs**: presenta un formulario para editar un grupo. Desde esta vista se seleccionan los quizzes que pertenecen al grupo.
    * **views/groups/random_play.ejs**: muestra una pregunta durante el juego.
    * **views/groups/random_nomore.ejs**: informa de que no quedan más quizzes para jugar.
    * **views/groups/random_result.ejs**: muestra si se acertó o falló una respuesta.

* Tarea 6: Desarrollar el controlador de grupos con los métodos y middlewares necesarios:

    * **load**: autocarga del parámetro **:groupId** de las rutas.
    * **index**: middleware que prepara el listado de grupos.
    * **new**: middleware que crea el formulario de creación de un grupo.
    * **create**: middleware que crea el grupo solicitado por el formulario **new**.
    * **edit**: middleware que crea el formulario de edición de un grupo.
    * **update**: middleware que actualiza el grupo con los cambios solicitados por el formulario **edit**.
    * **destroy**: middleware para eliminar un grupo.
    * **randomPlay**: jugar a contestar a un nuevo quiz de un grupo.
    * **randomCheck**: comprobar una respuesta.

* Tarea 7: Soportar dos roles:
    * **Usuario administrador**: puede crear, editar y destruir los grupos.
    * **Todos los usuarios**: pueden consultar el listado de grupos y jugar a **Random Play** con un grupo. 

* Opcional de Git: Integrar las ramas **master** y las **entregas 8** y **9** para crear una versión del proyecto que tenga todas las funcionalidades desarrolladas.


## Descargar el código del proyecto

Para desarrollar esta práctica es necesario utilizar la **versión 12 de Node.js**.

El alumno debe clonar el proyecto **Entrega9\_groups** en el ordenador en el que se está trabajando:

```sh
$ git clone https://github.com/CORE-2020/Entrega9_groups
```

El proyecto **Entrega9\_groups** solo contiene los ficheros necesarios para ejecutar el autocorrector. El alumno debe clonar también el proyecto **Quiz** desarrollado en la asignatura en un subdirectorio de **Entrega9\_groups**. El proyecto **Quiz** está disponible en el siguiente repositorio git:

```url
https://github.com/CORE-UPM/quiz_2020
```

Para clonar el proyecto **Quiz** en un subdirectorio dentro del proyecto **Entrega9\_groups**, e instalar las dependencias necesarias, ejecutar:

```sh
$ cd Entrega9_groups
$ npm install 
$ git clone https://github.com/CORE-UPM/quiz_2020
$ cd quiz_2020
$ npm install 
```

Alternativamente, el alumno también puede clonar o copiar la versión del proyecto **Quiz** que modificó en el entrega 8. Suponiendo que la entrega 8 se realizó en un directorio hermano del actual, entonces para clonar el proyecto **Quiz** modificado en esa entrega, e instalar las dependencias, deberían ejecutarse los siguientes comandos:

```sh
$ cd Entrega9_groups
$ npm install 
$ git clone ../Entrega8_randomplay/quiz_2020
$ cd quiz_2020
$ npm install 
```

## Tareas

### Tarea 1 - Crear una rama git

Para realizar esta práctica el alumno debe crear una rama, denominada **entrega9**, en el commit identificado con el tag **5.1_authors** ("*Step 5.1: Authors of Quizzes.*") del proyecto **Quiz**. El último commit de esta rama será la versión de la practica que se evaluará.

Nota: Asegúrese de que se encuentra en el subdirectorio **Entrega9\_groups/quiz_2020** antes de ejecutar los comandos que se describen más abajo.


El alumno puede crear la rama **entrega9** ejecutando el siguiente comando:

```
$ git branch entrega9 5.1_authors
```

Este comando crea la rama **entrega9** en el commit identificado por el tag **5.1_authors**.

Para cambiarse a esta rama ejecutar:

```
$ git checkout entrega9
```

Para comprobar que se está trabajando en la rama **entrega9**, el alumno puede ejecutar el comando **"git branch"**, que presentará un listado de las ramas existentes, y marcando con un asterisco la rama actual de trabajo.

El comando **git checkout** anterior puede fallar si la instalacion de paquetes con "**npm install**" modificó el fichero **package-lock.json**. Si ocurre esto, ejecute **"git checkout package-lock.json"** para restaurar ese fichero a su estado original, y repita el checkout.


El alumno tambien puede crear ramas y cambiar de rama usando las facilidades que le proporcione el IDE que esté utilizando.

### Tarea 2 - Actualizar la barra de navegación

En esta tarea el alumno debe añadir un botón, llamado **Groups**, en la barra de navegación. Al pulsar este botón se debe presentar un listado con todos los grupos existentes.

Para ello hay que añadir un nuevo enlace en la barra de navegación implementada en **views/layout.ejs**. El nombre del enlace debe ser **Groups**, y al pulsarlo debe enviar la solicitud:

```text
GET /groups
```

Para comprobar que se ha creado bien este botón, aplique las migraciones, el seeder, lance el servidor, y conéctese con un navegador a la URL **http://localhost:3000**. En la barra de navegación debe aparecer el botón **Groups**, aunque de momento no funciona. Para ello debe ejecutar:

```sh
$ npm run migrate
$ npm run seed
$ npm start
$ Lanzar Chrome y visitar http://localhost:3000
```
 
### Tarea 3: Definir el modelo Group.

El alumno tiene que definir el nuevo modelo para los grupos. El modelo debe llamarse **Group**, y tener un campo llamado **name** para guardar el nombre del grupo. El campo **name** debe ser de tipo **STRING**, no puede repetirse (**unique: true**), y no puede dejarse vacío (**validate: {notEmpty: {msg: "Group name must not be empty"}}**). La definición del modelo **Group** debe hacerse en el fichero **models/group.js**.

El alumno debe editar el fichero **models/index.js** para importar la definición del modelo **Group**. También debe definir la relación **NaN** entre los grupos y los quizzes usando el metodo **belongsToMany**. Use como alias los valores **"groups"** y **"quizzes"**, use **"GroupQuizzes"** como nombre de la tabla join, y use los nombres **"quizId"** y **"groupId"** para las claves externas. La definición de la relación debería ser algo parecido a:

```
Quiz.belongsToMany(Group, {
    as: 'groups',
    through: 'GroupQuizzes',
    foreignKey: 'quizId',
    otherKey: 'groupId'
});

Group.belongsToMany(Quiz, {
    as: 'quizzes',
    through: 'GroupQuizzes',
    foreignKey: 'groupId',
    otherKey: 'quizId'
});
```

El alumno debe crear dos ficheros de migraciones, uno para crear la tabla **Groups** y otro para crear la tabla join **GroupQuizzes**.

La migración que crea la tabla **Groups** debe llamarse **migrations/YYYYMMDDhhmmss-CreateGroupsTable.js**, donde YYYYMMDDhhmmss es la fecha en la que se creó el fichero. El contenido de este fichero es similar a las migraciones que crean las otras tablas, excepto que nuestra tabla se debe llamar **Groups**, y sus campos son **id**, **name**, **createdAt** y **updateAt**. Recuerde que las propiedades del campo **name** deben ser: 

```
name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {notEmpty: {msg: "Group name must not be empty."}}
},
```

La migración que crea la tabla join **GroupQuizzes** llamarse **migrations/YYYYMMDDhhmmss-CreateGroupQuizzesTable.js**, donde YYYYMMDDhhmmss es la fecha en la que se creó el fichero. Recuerde que es una tabla join, que no se usa como modelo, y por tanto, no debe tener el campo **id**. Los campos que debe tener esta tabla son **quizId**, **groupId**, **createdAt** y **updatedAt**. La clave primaria de esta tabla es una combinación de los campos **quizId** y **groupId**. Hay que definir adecuadamente estos campos para que al borrar un quiz o un grupo, se eliminen los datos relacionados de esta tabla. Teniendo en cuenta estos detalles, el contenido de este fichero de migración sería parecido a lo siguiente:

```
'use strict';

module.exports = {
    up(queryInterface, Sequelize) {

        return queryInterface.createTable(
            'GroupQuizzes',
            {
                quizId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    unique: "compositeKey",
                    allowNull: false,
                    references: {
                        model: "Quizzes",
                        key: "id"
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                groupId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    unique: "compositeKey",
                    allowNull: false,
                    references: {
                        model: "Groups",
                        key: "id"
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            },
            {
                sync: {force: true}
            }
        );
    },

    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('GroupQuizzes');
    }
};
```


También debe crear un seeder nuevo, llamado **seeders/20200402120800-FillGroupsTable.js** para crear un grupo llamado **Geography** que contendrá los quizzes de geografía existentes, y un grupo llamado **Math** con varios quizzes sobre matemáticas. Su contenido será el siguiente:

```
'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // Añadimos dos grupos, y varias preguntas nuevas.
        // Las preguntas existentes van a la categoría Geography.
        // Las nuevas a Math

        // Add geography group
        let now = new Date();
        await queryInterface.bulkInsert('Groups', [
            {
                name: 'Geography',
                createdAt: now,
                updatedAt: now,
            },
            {
                name: 'Math',
                createdAt: now,
                updatedAt: now,
            },
        ]);

        await queryInterface.bulkInsert('Quizzes', [
            {
                question: '1+1=?',
                answer: '2',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                question: '5^2=?',
                answer: '25',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])

        const assignments = {
            "Capital of%": "Geography",
            "%=?": "Math"
        };

        for (var query in assignments) {

            const quizzes = (await queryInterface.sequelize.query(
                `SELECT id from Quizzes where question LIKE "${query}";`
            ))[0];

            const course_id = (await queryInterface.sequelize.query(
                `SELECT id from Groups where name='${assignments[query]}';`
            ))[0][0].id;

            for (var q in quizzes) {
                let q_id = quizzes[q].id;

                let query = `INSERT or REPLACE into GroupQuizzes (quizId, groupId, createdAt, updatedAt) values (${q_id}, ${course_id}, "${now.toISOString()}", "${now.toISOString()}");`

                await queryInterface.sequelize.query(query);
            }
        }
    },

    down: async(queryInterface, Sequelize) => {

        // remove extra quizzes
        await queryInterface.bulkDelete('Quizzes', {question: {[Sequelize.Op.like]: '%=?'}}, {});

        await queryInterface.bulkDelete('Groups', null, {});
        return queryInterface.bulkDelete('GroupQuizzes', null, {});
    }
};
```

Para aplicar la nueva migración y el nuevo seeder, lo más cómodo es borrar el fichero **quiz.sqlite** y crearlo otra vez aplicando todas las migraciones y seeders. Para ello se deben ejecutar los comandos:

```sh
$ rm quiz.sqlite      // en Unix
$ del quiz.sqlite     // en Windows
$ npm run migrate
$ npm run seed
```

Si no quiere borrar su base de datos, puede aplicar las migraciones pendientes y el nuevo fichero seeder ejecutando estos comandos:

```sh
$ npm run migrate
$ npx sequelize db:seed --url DATABASEURL --seed SEEDFILENAME
```

donde debe sustituir *DATABASEURL* por la URL absoluta del fichero **quiz.sqlite**, y sustituir *SEEDFILENAME* por el nombre del fichero seed a ejecutar. Después de realizar estas sustituciones, el segundo comando será parecido a esto:

```sh
$ npx sequelize db:seed --url sqlite://$(pwd)/quiz.sqlite --seed 20200402120800-FillGroupsTable.js
```

### Tarea 4: Definir las rutas necesarias:

En esta tarea el alumno debe editar el fichero **routes/index.js** para añadir las definiciones de las rutas CRUD para manejar los grupos, y las definiciones de las rutas que permiten jugar.

Las rutas CRUD son parecidas a las existentes para los quizzes, pero sustituyendo en ciertos sitios **"quizzes"** por **"groups"**, **":quizId"** por **":groupId"**, **"quizController"** por **"groupController"**, etc. Atención: no se deben usar los middlewares **quizController.adminOrAuthorRequired** ni **sessionController.loginRequired** en las rutas de los grupos. De momento todo el mundo debe poder consultar, crear, editar y borrar los grupos.

Teniendo en cuenta los nombres de los middlewares que se van a crear en la tarea 6, la definición de las rutas CRUD sería algo parecido a lo siguiente:

```
const groupController = require('../controllers/group');

router.param('groupId', groupController.load);

router.get('/groups',
    groupController.index);
router.get('/groups/new',
    groupController.new);
router.post('/groups',
    groupController.create);
router.get('/groups/:groupId(\\d+)/edit',
    groupController.edit);
router.put('/groups/:groupId(\\d+)',
    groupController.update);
router.delete('/groups/:groupId(\\d+)',
    groupController.destroy);
```

Nótese que se ha requerido el controlador de grupos y que se ha definido el middleware que carga el grupo referenciado por el parámetro de ruta **":groupId"**. 

Las rutas para jugar son muy parecidas a las rutas **Random Play** desarrolladas en la Entrega 8. Teniendo en cuenta que son de tipo **GET**, que los paths son **"/groups/:groupId/randomplay"** y **"/groups/:groupId/randomcheck/:quizId"**, y que los middlewares de atienden estas peticiones son **"groupController.randomPlay"** y **"groupController.randomCheck"**, la definición de estas rutas sería algo parecido a: 

```
router.get('/groups/:groupId(\\d+)/randomplay',  groupController.randomPlay);
router.get('/groups/:groupId(\\d+)/randomcheck/:quizId(\\d+)', groupController.randomCheck);
```

El alumno también tiene que editar el fichero **routes/index.js** para añadir **"/groups"** a las rutas de restauración. Así, la redirección **"/goback"** podrá volver al listado de grupos. 

```
router.get(
    [
        '/',
        '/author',
        '/users',
        '/quizzes',
        '/groups'
    ],
    saveBack);
```

### Tarea 5 - Crear las vistas:

Esta entrega necesita seis vistas.

La vista **views/groups/index.ejs** muestra un listado con todos los grupos, permite editar y borrar los grupos existentes, y crear nuevos grupos. El método **res.render** debe proporcionar a esta vista un array con los grupos descargados de la base de datos en un parámetro llamado **groups**. Una versión incompleta de esta vista, excluyendo la parte de los roles de usuario, podría ser la siguiente:

```
<h1>Groups:</h1>

<table>
    <% for (var i in groups) { %>
        <% var group = groups[i]; %>
        <tr>
            <td>
                <a href="/groups/<%= group.id %>/randomplay"><%= group.name %></a>
            </td>
            <td>
                <a href="/groups/<%= group.id %>/edit" class="button">Edit</a>
            </td>
            <td>
                <a href="/groups/<%= group.id %>?_method=DELETE"
                   onClick="return confirm('Delete: <%= group.name %>');"
                   class="button">Delete</a>
            </td>
        </tr>
    <% } %>
</table>

<a href="/groups/new" class="button">Create New Group</a>
```

La vista **views/groups/new.ejs** presenta un formulario para crear un grupo nuevo. El método **res.render** debe proporcionar a esta vista un objeto grupo para que rellene el formulario. Se necesita para rellenar el formulario con valores iniciales, especialmente cuando hay errores de validación. El código de esta vista es el siguiente:

```
<h1>
    Add Group:
</h1>

<form method="post" action="/groups">

    <div class="wideRow">
        <label for="name" class="itemNarrow">Name:</label>
        <input type="text" class="itemWide" id="name" name="name" value="<%= group.name %>" placeholder="Group name"
               autocomplete="off"/>
    </div>

    <br/>

    <a href="/goback" class="button">Cancel</a>

    <input type="submit" value="Save">

</form>
```

La vista **views/groups/edit.ejs** presenta un formulario para editar el nombre de un grupo y seleccionar los quizzes que pertenecen a él. El método **res.render** debe proporcionar tres parámetros a esta vista: un parámetro llamado **group** con el objeto grupo a editar, un parámetro llamado **allQuizzes** conteniendo un array con todos los quizzes existentes en la base de datos, y un parámetro llamado **groupQuizzesIds** conteniendo un array con los ids de los quizzes que pertenecen al grupo. El código de esta vista es el siguiente:

```
<h1>
    Configure Group: <%= group.name %>
</h1>

<form method="post" action="/groups/<%= group.id %>?_method=PUT">

    <div class="wideRow">
        <label for="name" class="itemNarrow">Name:</label>
        <input type="text" class="itemWide" id="name" name="name" value="<%= group.name %>" placeholder="Group name"
               autocomplete="off"/>
    </div>

    <br/>

    <% for (var i in allQuizzes) { %>
        <% var quiz = allQuizzes[i]; %>

        <div>
                <input type="checkbox"
                       name="quizzesIds[]"
                       value="<%= quiz.id %>"
                       <%= groupQuizzesIds.includes(quiz.id) ? "checked" : "" %>
                >
                <%= quiz.question %> - <%= quiz.answer %>
        </div>

    <% } %>

    <br/>

    <a href="/goback" class="button">Cancel</a>

    <input type="submit" value="Save">

</form>
```

La vista anterior usa elementos **input** de tipo **checkbox** para seleccionar los quizzes que pertenecen al grupo. El formulario envía los valores seleccionados en el array **quizzesIds**. Nótese que el valor del atributo **name** de los elementos **input** tiene una sintaxis de array: **"quizzesIds[]"**. Es una sintaxis extendida para enviar los datos del formulario en un array en vez de en variables independientes. Este array contiene solamente con los valores de los checkboxes seleccionados. Para que esta sintaxis funcione, hay que modificar el fichero **app.js**, cambiando la línea:

```
app.use(express.urlencoded({ extended: false }));
```

por esta otra:

```
app.use(express.urlencoded({ extended: true }));
```

Este cambio le indica al middleware **express.urlencoded** que los datos enviados por el formulario usan la sintaxis extendida de arrays. El middleware procesará los datos recibidos teniendo en cuenta esta sintaxis, y los pasará en un array asignado a **req.body.quizzesIds**.
 
Las vistas **views/groups/random\_play.ejs**, **views/groups/random\_nomore.ejs** y **views/groups/random\_result.ejs** son parecidas a las usadas en la Entrega 8 **Random Play**. Se diferencian en que **res.render** pasa un parámetro adicional, llamado **group**, con el objeto grupo con el que se está jugando. 

El código de la vista **views/groups/random\_play.ejs** es el siguiente:

```
<h1>
    Group Play: <%= group.name %>
</h1>

<div>
    Successful answers = <span id="score"><%= score %></span>
</div>

<form method="get" action="/groups/<%= group.id %>/randomcheck/<%= quiz.id %>">

    <p>
        Question: <b><%= quiz.question %></b>
    </p>


    <div class="wideRow">
        <input type="text" class="itemWide" id="answer" name="answer" value="" placeholder="Answer" autocomplete="off"/>
        <input type="submit" class="itemNarrow" id="send" value="Check">
    </div>
</form>

```

El código de la vista **views/groups/random\_nomore.ejs** es el siguiente:

```
<h1>
    End of Group Play:  <%= group.name %>
</h1>

<div>
    Successful answers = <span id="score"><%= score %></span>
</div>

<p>
    You answered all questions. You are a champion.
</p>

<p>
    <a href="/goback" class="button">Go back</a>
</p>
```

El código de la vista **views/groups/random\_result.ejs** es el siguiente:

```
<h1>
    Group Play:  <%= group.name %>
</h1>

<p>
    Successful answers = <span id="score"><%= score %></span>
</p>

<p>
    The answer <strong> <%= answer %> </strong> is <%= result ? 'right' : 'wrong' %>.
</p>

<% if (!result) { %>
    <p>
        You have failed.
    </p>
    <p>
        <a href="/goback" class="button">End of Play</a>
    </p>

<% } else { %>
    <p>
        You have succeeded.
    </p>
    <p>
        <a href="/groups/<%= group.id %>/randomplay" class="button">Continue playing</a>
    </p>
<% } %>
```

### Tarea 6: Desarrollar el controlador de grupos

El alumno debe desarrollar el módulo controlador de grupos en el fichero **controllers/group.js**.

Debe implementar y exportar los siguientes middlewares siguiendo los detalles proporcionados:


#### Middleware load(req, res, next, groupId)

Middleware para autocargar el parámetro **:groupId** de las rutas. Busca el grupo en la base de datos y los guarda en **req.load.group**. 

Este middleware es muy similar a los desarrollados en otros controladores (*user*, *quiz*).


#### Middleware index(req, res, next)

Middleware para preparar la vista con el listado de todos los grupos. 

Los grupos se obtienen mediante la llamada:

```
const groups = await models.Group.findAll()
```

y la vista se renderiza con:


```
res.render('groups/index.ejs', {groups});
```

#### Middleware new(req, res, next)

Middleware para crear la vista con el formulario de creación de un grupo.

La vista se renderiza con:

```
const group = {name: ""};
res.render('groups/new', {group});
```

#### Middleware create(req, res, next)

Middleware para crear un grupo con el nombre enviado por el formulario **new**.

Este middleware debe construir un objeto Group con los datos (**name**) recibidos del formulario, y salvarlo en la base de datos. Si hay éxito debe hacer una redirección a la vista **index**. Si hay errores de validación debe mostrar otra vez el formulario.

El código de este middleware es muy parecido al de creación de quizzes.


#### Middleware edit(req, res, next)

Middleware para crear el formulario de edición de un grupo.

Este middleware debe pasar a la vista de edición tres valores: **group** que es el objeto grupo a editar, **allQuizzes** que es un array con todos los quizzes existentes en la base de datos, y **groupQuizzesIds** que es un array con los ids de los quizzes que pertencen actualmente al grupo. 

```
const {group} = req.load;
const allQuizzes = await models.Quiz.findAll();
const groupQuizzesIds = await group.getQuizzes().map(quiz => quiz.id);
res.render('groups/edit', {group, allQuizzes, groupQuizzesIds});
```

#### Middleware update(req, res, next)

Middleware para actualizar el nombre del grupo y los quizzes que le pertenecen siguiendo los cambios enviados desde el formulario de edición.

Las siguientes sentencias ilustran lo que tiene que hacer este middleware para recuperar los datos del formulario, salvar el nombre del grupo, y actualizar los quizzes. Falta la parte de tratamiento de errores, validaciones y mensajes de flash.

```
const {group} = req.load;

const {name, quizzesIds = []} = req.body;

group.name = name.trim();

await group.save({fields: ["name"]});
await group.setQuizzes(quizzesIds);

res.redirect('/groups');
```


Recuerde que el formulario de edición usa una sintaxis extendida para enviar la lista de quizzes del grupo, y es necesario modificar el fichero **app.js**, cambiando la línea:


```
app.use(express.urlencoded({ extended: false }));
```

por esta otra:

```
app.use(express.urlencoded({ extended: true }));
```

#### Middleware destroy(req, res, next)

Middleware para eliminar un grupo. Es muy parecido a los ya existentes para *user* o *quiz*.


#### Middlewares randomPlay(req, res, next) y randomCheck(req, res, next)

Parecidos a los de la entrega 8.

El principal cambio consiste en que para cada grupo al que se esté jugando, se debe guardar su array de preguntas ya contestadas, y el **id** de su último quiz preguntado, en un sitio diferente de la session. Esto permite que un usuario pueda jugar a varios grupos a la vez sin que se mezclen los datos de cada juego. Es decir, el usuario podría pulsar en el nombre de un grupo para empezar a jugar, luego pulsar en otro grupo para jugar otro juego paralelo. Si el usuario vuelve a pulsar sobre el grupo inicial, continuaría con ese juego en el punto donde lo dejó.


En este punto de la entrega, se puede comprobar si lo desarrollado en las tareas anteriores funciona correctamente. Lance el servidor, y conéctese con un navegador a la URL **http://localhost:3000**. 

```sh
$ npm start
$ Lanzar Chrome y visitar http://localhost:3000
```

### Tarea 7: Soportar dos roles: administrador y normal

El alumno debe modificar el trabajo realizado hasta ahora para soportar dos tipos de usuarios:

* El usuario administrador que puede crear, editar y destruir los grupos.
* Todos los demás usuarios, que solo pueden consultar el listado de grupos y jugar a **Random Play** con un grupo. 

Para implementar estos roles hay que hacer dos cambios:

Modificar las rutas definidas en **routes/index.js** para que ciertas peticiones solo las puedan realizar los administradores. Deben añadirse las siguientes líneas en todas las rutas a proteger:

```
sessionController.loginRequired,
sessionController.adminRequired,
```

El segundo cambio consiste modificar las vistas EJS para que el código HTML que muestra los botones de crear, editar y destruir los grupos, solo se muestre a los usuarios logueados que sean administadores. Para ello, se  debe proteger el codigo HTML a no mostrar con los siguientes condicionales de EJS:

```
<% if (locals.loginUser && locals.loginUser.isAdmin) { %>
    CODIGO HTML
<% } %>
```



### A jugar

El alumno debe comprobar que la entrega funciona correctamente lanzando el servidor con el comando **"npm start"**, y visitando la URL **http://localhost:3000** desde un navegador. Compruebe que la creación, edición y borrado de grupos solo se pueden hacer entrando como administrador, y que funciona correctemente. Compruebe que todo el mundo puede jugar a los grupos, que se puede jugar a varios grupos simultaneamente, etc...

Si es la primera vez que va a correr el servidor, recuerde que debe aplicar las migraciones y seeders ejecutando:

```sh
$ npm run migrate 
$ npm run seed 
```

Nota: *migrate\_win* y *seed\_win* para Windows.

### Congelar los cambios

Cuando el alumno haya terminado la práctica, o siempre que lo considere oportuno, debe congelar una versión del trabajo realizado:

```sh
$ git add app.js
$ git add views/layout.ejs
$ git add views/groups/index.ejs
$ git add views/groups/new.ejs
$ git add views/groups/edit.ejs
$ git add views/groups/random_play.ejs
$ git add views/groups/random_nomore.ejs
$ git add views/groups/random_result.ejs
$ git add routes/index.js
$ git add models/index.js
$ git add models/group.js
$ git add controllers/group.js
$ git add migrations/??????????????-CreateGroupsTable.js
$ git add migrations/??????????????-CreateGroupQuizzessTable.js
$ git add seeders/??????????????-FillGroupsTable.js
$ git commit
```

## Prueba de la práctica

Para ayudar al desarrollo, se provee una herramienta de autocorrección que prueba las distintas funcionalidades que se piden en el enunciado. Para utilizar esta herramienta debes tener node.js (y npm) (https://nodejs.org/es/) y Git instalados.

Para instalar y hacer uso de la herramienta de autocorrección en el ordenador local, ejecuta los siguientes comandos en el directorio raíz del proyecto, es decir, en el directorio padre del directorio **quiz_express**:

```
$ sudo npm install -g autocorector    ## Instala el programa de test
$ autocorector                        ## Pasa los tests al fichero a entregar
............................           ## en el directorio de trabajo
... (resultado de los tests)
```

También se puede instalar como paquete local, en el caso de que no dispongas de permisos en 
el ordenador en el que estás trabajando:

```
$ npm install autocorector     ## Instala el programa de test
$ npx autocorector             ## Pasa los tests al fichero a entregar
............................   ## en el directorio de trabajo
... (resultado de los tests)
```

Se puede pasar la herramienta de autocorrección tantas veces como se desee sin ninguna repercusión en la calificación.

## Instrucciones para la Entrega y Evaluación.

Una vez satisfecho con su calificación, el alumno puede subir su entrega a Moodle con el siguiente comando:

```
$ autocorector --upload
```

o, si se ha instalado como paquete local:

```
$ npx autocorector --upload
```

La herramienta de autocorrección preguntará por el correo del alumno y el token de Moodle. 
En el enlace **https://www.npmjs.com/package/autocorector** se proveen instrucciones para encontrar dicho token.

**RÚBRICA**: Se puntuará el ejercicio a corregir sumando el % indicado a la nota total si la parte indicada es correcta:

- **30%:** Los grupos se crean, editan y borran solo por administradores.
- **70%:** El juego de los grupos funciona bien.



Si pasa todos los tests se dará la máxima puntuación.
