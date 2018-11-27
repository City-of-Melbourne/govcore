<template>
  <div id="example-one" class="container mb-3 mt-3">
    <h1>vue-form-json-schema</h1>
    <h3>Example #1 <small class="text-muted">Minimal example</small></h3>
    <p class="lead">
      <span>A minimal example showing a simple <code>input</code> field.</span>
    </p>
    <p class="text-center font-weight-bold"><a href="https://codesandbox.io/s/py6611pr9m" target="_blank" rel="noopener noreferrer">Click here to edit this demo</a></p>
    <p class="text-center font-weight-bold"><a href="https://py6611pr9m.codesandbox.io/" target="_blank" rel="noopener noreferrer">Click here to show this demo in a separate window</a></p>

    <vue-form-json-schema
      :model="model"
      :schema="schema"
      :ui-schema="uiSchema"
      v-on:change="onChange"
      v-on:state-change="onChangeState"
      v-on:validated="onValidated"
    >
    </vue-form-json-schema>

    <hr />

    <h4>Model</h4>
    <pretty-print :value="model"></pretty-print>

    <h4>Schema</h4>
    <pretty-print :value="schema"></pretty-print>

    <h4>UI Schema</h4>
    <pretty-print :value="uiSchema"></pretty-print>

    <h4>State</h4>
    <pretty-print :value="state"></pretty-print>

    <h4>Valid</h4>
    <div>{{ valid }}</div>
  </div>
</template>

<script>
// Import VueFormJsonSchema
import VueFormJsonSchema from 'vue-form-json-schema';
// We use a component to display JSON in a pretty way
// it is NOT included NOR required by VueFormJsonSchema
import PrettyPrint from '../components/pretty-print'

export default {
  name: 'example-one',
  components: {
    'vue-form-json-schema': VueFormJsonSchema,
    'pretty-print': PrettyPrint
  },
  data() {
    return {
      model: {},
      state: {},
      valid: false,
      schema: {
        
        properties: {
          firstName: {
            type: 'string',
          }
          ,
          secondName: {
            type: 'string',
          }
        },
      },
      uiSchema: [{
        component: 'b-input',
        model: 'firstName',
        fieldOptions: { on: ['input']  }
      },
      {
        component: 'b-input',
        model: 'secondName',
        fieldOptions: { on: ['input']  }
      }
      
      
      ],
    };
  },
  methods: {
    onChange(value) {
      this.model = value;
    },
    onChangeState(value) {
      this.state = value;
    },
    onValidated(value) {
      this.valid = value;
    },
  },
};
</script>