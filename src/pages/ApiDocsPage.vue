<script setup lang="ts">
import { useScrollTop } from '@/composables/scrollTop';
import { ref, getCurrentInstance } from 'vue';
import { getTranslateFn } from '@/util/i18n';

useScrollTop();
const $t = getTranslateFn(getCurrentInstance());

interface ApiDocParameter {
  name: string;
  type: string;
  descriptionKey: string;
  required: boolean;
  default?: string | number;
}

interface ApiDocEndpoint {
  path: string;
  methods: string[];
  descriptionKey: string;
  values: Record<string, string | number>;
  parameters: ApiDocParameter[];
}

interface ApiDocs {
  nameKey: string;
  version: string;
  descriptionKey: string;
  endpoints: ApiDocEndpoint[];
}

const apiDocs = ref<ApiDocs>({
  nameKey: 'apiDocsName',
  version: '1.0.0',
  descriptionKey: 'apiDocsDesc',
  endpoints: [
    {
      path: '/api/searchPlaces',
      methods: ['GET'],
      descriptionKey: 'apiDesc_searchPlaces',
      values: { q: 'istanbul' },
      parameters: [
        {
          name: 'q',
          type: 'string',
          descriptionKey: 'apiParamDesc_q',
          required: false,
          default: 'istanbul',
        },
        {
          name: 'lat',
          type: 'number',
          descriptionKey: 'apiParamDesc_latProx',
          required: false,
        },
        {
          name: 'lng',
          type: 'number',
          descriptionKey: 'apiParamDesc_lngProx',
          required: false,
        },
        {
          name: 'lang',
          type: 'string',
          descriptionKey: 'apiParamDesc_langEx',
          required: false,
        },
        {
          name: 'countryCode',
          type: 'string',
          descriptionKey: 'apiParamDesc_countryCode',
          required: false,
        },
      ],
    },
    {
      path: '/api/nearByPlaces',
      methods: ['GET'],
      descriptionKey: 'apiDesc_nearByPlaces',
      values: { lat: 41.0082, lng: 28.9784 },
      parameters: [
        {
          name: 'lat',
          type: 'number',
          descriptionKey: 'apiParamDesc_lat',
          required: true,
          default: 41.0082,
        },
        {
          name: 'lng',
          type: 'number',
          descriptionKey: 'apiParamDesc_lng',
          required: true,
          default: 28.9784,
        },
        { name: 'lang', type: 'string', descriptionKey: 'apiParamDesc_lang', required: false },
      ],
    },
    {
      path: '/api/timesForGPS',
      methods: ['GET'],
      descriptionKey: 'apiDesc_timesForGPS',
      values: { lat: 41.0082, lng: 28.9784, date: new Date().toISOString().split('T')[0], days: 1 },
      parameters: [
        {
          name: 'lat',
          type: 'number',
          descriptionKey: 'apiParamDesc_lat',
          required: true,
          default: 41.0082,
        },
        {
          name: 'lng',
          type: 'number',
          descriptionKey: 'apiParamDesc_lng',
          required: true,
          default: 28.9784,
        },
        {
          name: 'date',
          type: 'string',
          descriptionKey: 'apiParamDesc_dateEx',
          required: false,
          default: new Date().toISOString().split('T')[0],
        },
        {
          name: 'days',
          type: 'number',
          descriptionKey: 'apiParamDesc_days',
          required: false,
          default: 1,
        },
        {
          name: 'tzOffset',
          type: 'number',
          descriptionKey: 'apiParamDesc_tzOffsetMin',
          required: false,
        },
        {
          name: 'calculateMethod',
          type: 'string',
          descriptionKey: 'apiParamDesc_calculateMethod',
          required: false,
        },
      ],
    },
    {
      path: '/api/timesForPlace',
      methods: ['GET'],
      descriptionKey: 'apiDesc_timesForPlace',
      values: {
        id: 'ChIJavhwfreaehMRs8XWp0C3_8c',
        date: new Date().toISOString().split('T')[0],
        days: 1,
      },
      parameters: [
        {
          name: 'id',
          type: 'string',
          descriptionKey: 'apiParamDesc_id',
          required: true,
          default: 'ChIJavhwfreaehMRs8XWp0C3_8c',
        },
        {
          name: 'date',
          type: 'string',
          descriptionKey: 'apiParamDesc_dateEx',
          required: false,
          default: new Date().toISOString().split('T')[0],
        },
        {
          name: 'days',
          type: 'number',
          descriptionKey: 'apiParamDesc_days',
          required: false,
          default: 1,
        },
        {
          name: 'tzOffset',
          type: 'number',
          descriptionKey: 'apiParamDesc_tzOffset',
          required: false,
        },
        {
          name: 'calculateMethod',
          type: 'string',
          descriptionKey: 'apiParamDesc_calculateMethod',
          required: false,
        },
      ],
    },
    {
      path: '/api/timesFromCoordinates',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_timesFromCoordinates',
      values: { lat: 41.0082, lng: 28.9784, date: new Date().toISOString().split('T')[0], days: 1 },
      parameters: [
        {
          name: 'lat',
          type: 'number',
          descriptionKey: 'apiParamDesc_lat',
          required: true,
          default: 41.0082,
        },
        {
          name: 'lng',
          type: 'number',
          descriptionKey: 'apiParamDesc_lng',
          required: true,
          default: 28.9784,
        },
        {
          name: 'date',
          type: 'string',
          descriptionKey: 'apiParamDesc_date',
          required: false,
          default: new Date().toISOString().split('T')[0],
        },
        {
          name: 'days',
          type: 'number',
          descriptionKey: 'apiParamDesc_days',
          required: false,
          default: 1,
        },
      ],
    },
    {
      path: '/api/timesFromPlace',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_timesFromPlace',
      values: { country: 'Turkey', city: 'Istanbul' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          descriptionKey: 'apiParamDesc_country',
          required: true,
          default: 'Turkey',
        },
        { name: 'region', type: 'string', descriptionKey: 'apiParamDesc_region', required: false },
        {
          name: 'city',
          type: 'string',
          descriptionKey: 'apiParamDesc_city',
          required: true,
          default: 'Istanbul',
        },
      ],
    },
    {
      path: '/api/countries',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_countries',
      values: {},
      parameters: [],
    },
    {
      path: '/api/regions',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_regions',
      values: { country: 'Turkey' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          descriptionKey: 'apiParamDesc_country',
          required: true,
          default: 'Turkey',
        },
      ],
    },
    {
      path: '/api/cities',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_cities',
      values: { country: 'Turkey', region: 'Istanbul' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          descriptionKey: 'apiParamDesc_country',
          required: true,
          default: 'Turkey',
        },
        {
          name: 'region',
          type: 'string',
          descriptionKey: 'apiParamDesc_region',
          required: true,
          default: 'Istanbul',
        },
      ],
    },
    {
      path: '/api/coordinates',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_coordinates',
      values: { country: 'Turkey', city: 'Istanbul' },
      parameters: [
        {
          name: 'country',
          type: 'string',
          descriptionKey: 'apiParamDesc_country',
          required: true,
          default: 'Turkey',
        },
        { name: 'region', type: 'string', descriptionKey: 'apiParamDesc_region', required: false },
        {
          name: 'city',
          type: 'string',
          descriptionKey: 'apiParamDesc_city',
          required: true,
          default: 'Istanbul',
        },
      ],
    },
    {
      path: '/api/place',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_place',
      values: { lat: 41.0082, lng: 28.9784 },
      parameters: [
        {
          name: 'lat',
          type: 'number',
          descriptionKey: 'apiParamDesc_lat',
          required: true,
          default: 41.0082,
        },
        {
          name: 'lng',
          type: 'number',
          descriptionKey: 'apiParamDesc_lng',
          required: true,
          default: 28.9784,
        },
      ],
    },
    {
      path: '/api/placeById',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_placeById',
      values: { id: 180 },
      parameters: [
        {
          name: 'id',
          type: 'number',
          descriptionKey: 'apiParamDesc_id',
          required: true,
          default: 180,
        },
        { name: 'lang', type: 'string', descriptionKey: 'apiParamDesc_lang', required: false },
      ],
    },
    {
      path: '/api/ip',
      methods: ['GET', 'POST'],
      descriptionKey: 'apiDesc_ip',
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
    <div class="text-h6 text-center my-4">{{ $t(apiDocs.nameKey) }}</div>
    <div class="text-subtitle-1 text-center mb-6">
      {{ $t(apiDocs.descriptionKey) }} (v{{ apiDocs.version }})
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
          <div class="mb-2 text-body-1">{{ $t(endpoint.descriptionKey) }}</div>

          <div v-if="endpoint.parameters && endpoint.parameters.length > 0">
            <div class="text-subtitle-2 mt-2 mb-1">{{ $t('apiParams') }}</div>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">{{ $t('apiNameCol') }}</th>
                  <th class="text-left">{{ $t('apiTypeCol') }}</th>
                  <th class="text-left">{{ $t('apiRequiredCol') }}</th>
                  <th class="text-left">{{ $t('apiDescCol') }}</th>
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
                    <span v-else class="text-caption text-grey">{{ $t('apiOptional') }}</span>
                  </td>
                  <td>{{ $t(param.descriptionKey) }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
          <div v-else class="text-caption text-grey mt-2">{{ $t('apiNoParamsReq') }}</div>

          <v-divider class="my-4"></v-divider>

          <div class="text-subtitle-1 mb-2">{{ $t('apiTryItOut') }}</div>
          <v-row v-if="endpoint.parameters && endpoint.parameters.length > 0">
            <v-col v-for="param in endpoint.parameters" :key="param.name" cols="12" md="6" lg="4">
              <v-text-field
                v-model="endpoint.values[param.name]"
                :label="param.name + (param.required ? ' *' : '')"
                :hint="$t(param.descriptionKey)"
                persistent-hint
                density="compact"
                variant="outlined"
                hide-details="auto"
                class="mb-2"
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="mt-4">
            <div class="text-subtitle-2 mb-1">{{ $t('apiRequestUrl') }}</div>
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
