export const MEASUREMENT_TYPE = 'measurement';
export const LIMIT_TYPE = 'limit';
export const SIMULATION_TYPE = 'simulation';
export const STATISTICS_TYPE = 'statistic';
export const NOT_LIMIT_TYPE = 'not_limit';

export const DATA_TYPES = {
	MEASUREMENT: MEASUREMENT_TYPE,
	LIMIT: LIMIT_TYPE,
	SIMULATION: SIMULATION_TYPE,
	STATISTICS: STATISTICS_TYPE,
};

export const ALLOWED_DATA_TYPES = Object.values(DATA_TYPES);

export const TYPE_TO_KEY_MAP = {
	[MEASUREMENT_TYPE]: 'categories',
	[SIMULATION_TYPE]: 'categories',
	[LIMIT_TYPE]: 'limits',
};
