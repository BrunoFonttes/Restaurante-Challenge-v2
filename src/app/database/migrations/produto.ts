import { MigrationData } from "./migration-data";

export const produto: MigrationData = {
	nome: 'produto',
	createTableText: `
CREATE TABLE IF NOT EXISTS produto (
	id UUID DEFAULT gen_random_uuid(),
	id_restaurante UUID,
  nome text UNIQUE NOT NULL,
  preco decimal(12,2) NOT NULL,
  foto bytea NOT NULL,
	categoria text NOT NULL,
	FOREIGN KEY (id_restaurante) REFERENCES restaurante(id) ON DELETE CASCADE,
	PRIMARY KEY(nome, id_restaurante)
);
`,
	destroyTableText: `
DROP TABLE IF EXISTS produto CASCADE;
`
}