<template>
  <pre v-html="this.prettyPrint(this.value)"></pre>
</template>

<script>
export default {
  name: 'JsonPrettyPrint',
  props: {
    value: {
      type: null,
    },
  },
  methods: {
    prettyPrint(json) {
      if (json) {
        const stringified = JSON.stringify(json, null, 2);
        const stringifiedReplaced = stringified.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

        return stringifiedReplaced.replace(regex, (match) => {
          let className = 'number';

          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              className = 'key';
            } else {
              className = 'string';
            }
          } else if (/true|false/.test(match)) {
            className = 'boolean';
          } else if (/null/.test(match)) {
            className = 'null';
          }

          return `<span class="${className}">${match}</span>`;
        });
      }

      return '';
    },
  },
};
</script>

<style>
pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 5px;
}

.string {
  color: #e91e63;
}

.number {
  color: #00bcd4;
}

.boolean {
  color: #ff00ff;
}

.null {
  color: #9e9e9e;
}

.key {
  color: #3753a9;
}
</style>
