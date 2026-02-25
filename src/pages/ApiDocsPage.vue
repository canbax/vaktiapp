<script setup lang="ts">
import { useScrollTop } from '@/composables/scrollTop';
import { ref } from 'vue';

useScrollTop();
interface ApiDocParameter {
  name: string;
  type: string;
  description: string;
  required: boolean;
  default?: string | number;
}

interface ApiDocEndpoint {
  path: string;
  methods: string[];
  description: string;
  values: Record<string, string | number>;
  parameters: ApiDocParameter[];
}

interface ApiDocs {
  name: string;
  version: string;
  description: string;
  endpoints: ApiDocEndpoint[];
}

const apiDocs = ref<ApiDocs>({
  name: 'Vakti App API',
  version: '1.0.0',
  description: 'API documentation for Vakti App prayer times and location services.',
  endpoints: [
    {
      path: '/api/searchPlaces',
      methods: ['GET'],
      description: 'Search for places by query string.',
      values: { q: 'istanbul' },
      parameters: [
        {
          name: 'q',
          type: 'string',
          description: 'Search query',
          required: false,
          default: 'istanbul',
        },
        {
          name: 'lat',
          type: 'number',
          description: 'Latitude for proximity ranking',
          required: false,
        },
        {
          name: 'lng',
          type: 'number',
          description: 'Longitude for proximity ranking',
          required: false,
        },
        {
          name: 'lang',
          type: 'string',
          description: "Language code (e.g. 'en', 'tr')",
          required: false,
        },
        {
          name: 'countryCode',
          type: 'string',
          description: 'Country code filter',
          required: false,
        },
      ],
    },
    {
      path: '/api/nearByPlaces',
      methods: ['GET'],
      description: 'Find places near specific coordinates.',
      values: { lat: 41.0082, lng: 28.9784 },
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true, default: 41.0082 },
        { name: 'lng', type: 'number', description: 'Longitude', required: true, default: 28.9784 },
        { name: 'lang', type: 'string', description: 'Language code', required: false },
      ],
    },
    {
      path: '/api/timesForGPS',
      methods: ['GET'],
      description: 'Get prayer times for a specific GPS location.',
      values: { lat: 41.0082, lng: 28.9784, date: new Date().toISOString().split('T')[0], days: 1 },
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true, default: 41.0082 },
        { name: 'lng', type: 'number', description: 'Longitude', required: true, default: 28.9784 },
        {
          name: 'date',
          type: 'string',
          description: 'Date (YYYY-MM-DD)',
          required: false,
          default: new Date().toISOString().split('T')[0],
        },
        {
          name: 'days',
          type: 'number',
          description: 'Number of days to fetch',
          required: false,
          default: 1,
        },
        {
          name: 'tzOffset',
          type: 'number',
          description: 'Timezone offset in minutes',
          required: false,
        },
        {
          name: 'calculateMethod',
          type: 'string',
          description: 'Calculation method',
          required: false,
        },
      ],
    },
    {
      path: '/api/timesForPlace',
      methods: ['GET'],
      description: 'Get prayer times for a specific place ID.',
      values: {
        id: 'ChIJavhwfreaehMRs8XWp0C3_8c',
        date: new Date().toISOString().split('T')[0],
        days: 1,
      },
      parameters: [
        {
          name: 'id',
          type: 'string',
          description: 'Place ID',
          required: true,
          default: 'ChIJavhwfreaehMRs8XWp0C3_8c',
        },
        {
          name: 'date',
          type: 'string',
          description: 'Date (YYYY-MM-DD)',
          required: false,
          default: new Date().toISOString().split('T')[0],
        },
        {
          name: 'days',
          type: 'number',
          description: 'Number of days to fetch',
          required: false,
          default: 1,
        },
        { name: 'tzOffset', type: 'number', description: 'Timezone offset', required: false },
        {
          name: 'calculateMethod',
          type: 'string',
          description: 'Calculation method',
          required: false,
        },
      ],
    },
    {
      path: '/api/timesFromCoordinates',
      methods: ['GET', 'POST'],
      description: 'Get prayer times from coordinates (alternative to timesForGPS).',
      values: { lat: 41.0082, lng: 28.9784, date: new Date().toISOString().split('T')[0], days: 1 },
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true, default: 41.0082 },
        { name: 'lng', type: 'number', description: 'Longitude', required: true, default: 28.9784 },
        {
          name: 'date',
          type: 'string',
          description: 'Date',
          required: false,
          default: new Date().toISOString().split('T')[0],
        },
        { name: 'days', type: 'number', description: 'Days to fetch', required: false, default: 1 },
      ],
    },
    {
      path: '/api/timesFromPlace',
      methods: ['GET', 'POST'],
      description: 'Get prayer times from place query (alternative to timesForPlace).',
      values: { country: 'Turkey', city: 'Istanbul' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          description: 'Country name',
          required: true,
          default: 'Turkey',
        },
        { name: 'region', type: 'string', description: 'Region name', required: false },
        {
          name: 'city',
          type: 'string',
          description: 'City name',
          required: true,
          default: 'Istanbul',
        },
      ],
    },
    {
      path: '/api/countries',
      methods: ['GET', 'POST'],
      description: 'List all available countries.',
      values: {},
      parameters: [],
    },
    {
      path: '/api/regions',
      methods: ['GET', 'POST'],
      description: 'Get regions for a country.',
      values: { country: 'Turkey' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          description: 'Country name',
          required: true,
          default: 'Turkey',
        },
      ],
    },
    {
      path: '/api/cities',
      methods: ['GET', 'POST'],
      description: 'Get cities for a region.',
      values: { country: 'Turkey', region: 'Istanbul' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          description: 'Country name',
          required: true,
          default: 'Turkey',
        },
        {
          name: 'region',
          type: 'string',
          description: 'Region name',
          required: true,
          default: 'Istanbul',
        },
      ],
    },
    {
      path: '/api/coordinates',
      methods: ['GET', 'POST'],
      description: 'Get coordinates for a specific location query.',
      values: { country: 'Turkey', city: 'Istanbul' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          description: 'Country name',
          required: true,
          default: 'Turkey',
        },
        { name: 'region', type: 'string', description: 'Region name', required: false },
        {
          name: 'city',
          type: 'string',
          description: 'City name',
          required: true,
          default: 'Istanbul',
        },
      ],
    },
    {
      path: '/api/place',
      methods: ['GET', 'POST'],
      description: 'Get place details by coordinates (lat, lng).',
      values: { lat: 41.0082, lng: 28.9784 },
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true, default: 41.0082 },
        { name: 'lng', type: 'number', description: 'Longitude', required: true, default: 28.9784 },
      ],
    },
    {
      path: '/api/placeById',
      methods: ['GET', 'POST'],
      description: 'Get place details by numeric ID.',
      values: { id: 180 },
      parameters: [
        { name: 'id', type: 'number', description: 'Place ID', required: true, default: 180 },
        { name: 'lang', type: 'string', description: 'Language code', required: false },
      ],
    },
    {
      path: '/api/ip',
      methods: ['GET', 'POST'],
      description: 'Get client IP address information.',
      values: {},
      parameters: [],
    },
  ],
});

const getEndpointUrl = (endpoint: ApiDocEndpoint) => {
  let baseUrl = 'https://vaktiapp.com/api/';
  if (!baseUrl.endsWith('/')) baseUrl += '/';

  let path = endpoint.path;
  if (path.startsWith('/api/')) path = path.substring(5);
  if (path.startsWith('/')) path = path.substring(1);

  const url = new URL(path, baseUrl);

  if (endpoint.parameters) {
    endpoint.parameters.forEach((p: ApiDocParameter) => {
      const val = endpoint.values[p.name];
      if (val !== undefined && val !== '' && val !== null) {
        url.searchParams.append(p.name, val.toString());
      }
    });
  }
  return url.toString();
};
</script>

<template>
  <v-container fluid>
    <div class="text-h6 text-center my-4">{{ apiDocs.name }}</div>
    <div class="text-subtitle-1 text-center mb-6">
      {{ apiDocs.description }} (v{{ apiDocs.version }})
    </div>

    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="(endpoint, index) in apiDocs.endpoints" :key="index">
        <v-expansion-panel-title>
          <div class="d-flex align-center">
            <template v-for="method in endpoint.methods" :key="method">
              <v-chip
                :color="method === 'GET' ? 'primary' : 'success'"
                size="small"
                class="mr-2 white--text font-weight-bold"
                label
              >
                {{ method }}
              </v-chip>
            </template>
            <span class="font-weight-medium">{{ endpoint.path }}</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="mb-2 text-body-1">{{ endpoint.description }}</div>

          <div v-if="endpoint.parameters && endpoint.parameters.length > 0">
            <div class="text-subtitle-2 mt-2 mb-1">Parameters:</div>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Type</th>
                  <th class="text-left">Required</th>
                  <th class="text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="param in endpoint.parameters" :key="param.name">
                  <td class="font-weight-medium">{{ param.name }}</td>
                  <td>
                    <code class="bg-grey-lighten-3 px-1 rounded">{{ param.type }}</code>
                  </td>
                  <td>
                    <v-icon v-if="param.required" color="error" size="small">mdi-check</v-icon>
                    <span v-else class="text-caption text-grey">Optional</span>
                  </td>
                  <td>{{ param.description }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-else class="text-caption text-grey mt-2">No parameters required.</div>

          <v-divider class="my-4"></v-divider>

          <div class="text-subtitle-1 mb-2">Try it out</div>
          <v-row v-if="endpoint.parameters && endpoint.parameters.length > 0">
            <v-col v-for="param in endpoint.parameters" :key="param.name" cols="12" md="6" lg="4">
              <v-text-field
                v-model="endpoint.values[param.name]"
                :label="param.name + (param.required ? ' *' : '')"
                :hint="param.description"
                persistent-hint
                density="compact"
                variant="outlined"
                hide-details="auto"
                class="mb-2"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="mt-4">
            <div class="text-subtitle-2 mb-1">Request URL:</div>
            <a
              :href="getEndpointUrl(endpoint)"
              target="_blank"
              class="d-flex align-center text-primary text-decoration-none py-2 px-3 bg-grey-lighten-4 rounded border"
              style="word-break: break-all"
            >
              <span class="mr-2">{{ getEndpointUrl(endpoint) }}</span>
              <v-icon size="small">mdi-open-in-new</v-icon>
            </a>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<style scoped></style>
