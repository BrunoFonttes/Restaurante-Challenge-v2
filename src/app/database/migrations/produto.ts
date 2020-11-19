import { MigrationData } from "./migration-data";

export const produto: MigrationData = {
	nome: 'produto',
	createTableText: `
CREATE TABLE IF NOT EXISTS produto (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	id_restaurante UUID,
  nome text NOT NULL,
  preco decimal(12,2) NOT NULL,
  foto bytea NOT NULL,
	categoria text NOT NULL,
	FOREIGN KEY (id_restaurante) REFERENCES restaurante(id)
);
`,
	destroyTableText: `
DROP TABLE IF EXISTS produto;
`
}