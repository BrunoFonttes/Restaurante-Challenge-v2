import { MigrationData } from "./migration-data";

export const restaurante: MigrationData = {
	nome: 'restaurante',
	createTableText: `
CREATE TABLE IF NOT EXISTS restaurante (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text unique,
  endereco text,
  foto bytea,
	seg_sex_abertura time,
	seg_sex_fechamento time,
	fim_de_semana_abertura time,
	fim_de_semana_fechamento time
);
`,
	destroyTableText: `
DROP TABLE IF EXISTS restaurante;
`
}