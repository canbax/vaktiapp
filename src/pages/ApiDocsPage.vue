<script setup lang="ts">
import { useScrollTop } from '@/composables/scrollTop';

useScrollTop();

const apiDocs = {
  name: 'Vakti App API',
  version: '1.0.0',
  description: 'API documentation for Vakti App prayer times and location services.',
  endpoints: [
    {
      path: '/api/searchPlaces',
      methods: ['GET'],
      description: 'Search for places by query string.',
      parameters: [
        { name: 'q', type: 'string', description: 'Search query', required: false },
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
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true },
        { name: 'lng', type: 'number', description: 'Longitude', required: true },
        { name: 'lang', type: 'string', description: 'Language code', required: false },
      ],
    },
    {
      path: '/api/timesForGPS',
      methods: ['GET'],
      description: 'Get prayer times for a specific GPS location.',
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true },
        { name: 'lng', type: 'number', description: 'Longitude', required: true },
        { name: 'date', type: 'string', description: 'Date (YYYY-MM-DD)', required: false },
        { name: 'days', type: 'number', description: 'Number of days to fetch', required: false },
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
      parameters: [
        { name: 'id', type: 'string', description: 'Place ID', required: true },
        { name: 'date', type: 'string', description: 'Date (YYYY-MM-DD)', required: false },
        { name: 'days', type: 'number', description: 'Number of days to fetch', required: false },
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
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true },
        { name: 'lng', type: 'number', description: 'Longitude', required: true },
        { name: 'date', type: 'string', description: 'Date', required: false },
        { name: 'days', type: 'number', description: 'Days to fetch', required: false },
      ],
    },
    {
      path: '/api/timesFromPlace',
      methods: ['GET', 'POST'],
      description: 'Get prayer times from place query (alternative to timesForPlace).',
      parameters: [
        { name: 'country', type: 'string', description: 'Country name', required: true },
        { name: 'region', type: 'string', description: 'Region name', required: false },
        { name: 'city', type: 'string', description: 'City name', required: true },
      ],
    },
    {
      path: '/api/countries',
      methods: ['GET', 'POST'],
      description: 'List all available countries.',
      parameters: [],
    },
    {
      path: '/api/regions',
      methods: ['GET', 'POST'],
      description: 'Get regions for a country.',
      parameters: [
        { name: 'country', type: 'string', description: 'Country name', required: true },
      ],
    },
    {
      path: '/api/cities',
      methods: ['GET', 'POST'],
      description: 'Get cities for a region.',
      parameters: [
        { name: 'country', type: 'string', description: 'Country name', required: true },
        { name: 'region', type: 'string', description: 'Region name', required: true },
      ],
    },
    {
      path: '/api/coordinates',
      methods: ['GET', 'POST'],
      description: 'Get coordinates for a specific location query.',
      parameters: [
        { name: 'country', type: 'string', description: 'Country name', required: true },
        { name: 'region', type: 'string', description: 'Region name', required: false },
        { name: 'city', type: 'string', description: 'City name', required: true },
      ],
    },
    {
      path: '/api/place',
      methods: ['GET', 'POST'],
      description: 'Get place details by coordinates (lat, lng).',
      parameters: [
        { name: 'lat', type: 'number', description: 'Latitude', required: true },
        { name: 'lng', type: 'number', description: 'Longitude', required: true },
      ],
    },
    {
      path: '/api/placeById',
      methods: ['GET', 'POST'],
      description: 'Get place details by numeric ID.',
      parameters: [
        { name: 'id', type: 'number', description: 'Place ID', required: true },
        { name: 'lang', type: 'string', description: 'Language code', required: false },
      ],
    },
    {
      path: '/api/ip',
      methods: ['GET', 'POST'],
      description: 'Get client IP address information.',
      parameters: [],
    },
  ],
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
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<style scoped></style>
