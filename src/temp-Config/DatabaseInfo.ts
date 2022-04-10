interface database {
  mariadb: object
}

const obj: database = {
  mariadb: {
    connectionLimit: 10,
    waitForConnections: true,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "dbname",
    port: 3306,
    charset: 'utf8'
  }
}

export default obj;