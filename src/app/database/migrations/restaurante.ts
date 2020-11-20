import { MigrationData } from "./migration-data";

export const restaurante: MigrationData = {
	nome: 'restaurante',
	createTableText: `
CREATE TABLE IF NOT EXISTS restaurante (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text unique NOT NULL,
  endereco text NOT NULL,
  foto bytea NOT NULL,
	seg_sex_abertura time NOT NULL,
	seg_sex_fechamento time NOT NULL,
	fim_de_semana_abertura time NOT NULL,
	fim_de_semana_fechamento time NOT NULL
);
`,
	destroyTableText: `
DROP TABLE IF EXISTS restaurante CASCADE;
`
}