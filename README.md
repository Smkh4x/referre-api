# stuctur project
referee-api/
├── config/
│   └── database.js           # Connexion Sequelize à PostgreSQL
├── models/
│   ├── index.js              # Initialisation + associations
│   ├── arbitre.model.js      # Modèle Arbitre (PK)
│   ├── match.model.js        # Modèle Match (PK)
│   └── affectation.model.js  # Modèle Affectation (FK arbitreId, matchId)
├── controllers/
│   ├── arbitre.controller.js
│   ├── match.controller.js
│   └── affectation.controller.js
├── routes/
│   ├── arbitre.routes.js
│   ├── match.routes.js
│   └── affectation.routes.js
├── middlewares/
│   ├── logger.middleware.js   # Journalisation des requêtes
│   ├── validate.middleware.js # Validation des données entrantes
│   └── error.middleware.js    # Gestion centralisée des erreurs
├── server.js
├── package.json
└── README.md

# part 2

src/
│
├── controllers/
│   ├── auth.controller.js
│
├── middlewares/
│   ├── authenticate.js
│   ├── authorize.js
│
├── models/
│   ├── user.model.js
│
├── routes/
│   ├── auth.route.js
│
├── utils/
│   ├── generateToken.js
│
├── .env
└── .env.example

# refresh token : 
Login
   │
   ▼
Server
   │
   ├── Access Token (1h)
   └── Refresh Token (7d)
           │
           ▼
      Database + Frontend

بعد ساعة
      │
      ▼
Access Token Expired
      │
      ▼
Frontend -> POST /refresh
      │
      ▼
Server يتحقق من Refresh Token
      │
      ├── غير صالح → 401
      └── صالح
             │
             ▼
      إصدار Access Token جديد
             │
             ▼
Frontend يخزن الجديد