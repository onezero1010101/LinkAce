export default class TagsSelect {

  constructor ($el) {
    this.$el = $el;

    this.config = {
      delimiter: ',',
      persist: false,
      load: (query, callback) => {
        this.handleTagLoading(query, callback);
      }
    };

    this.init();
  }

  init () {
    this.prepareConfig();

    $(this.$el).selectize(this.config);
  }

  prepareConfig () {
    if (this.selectAllowsCreation()) {
      this.config.create = function (input) {
        return {
          value: input,
          text: input
        };
      };
    }
  }

  selectAllowsCreation () {
    return typeof this.$el.dataset.allowCreation !== 'undefined';
  }

  handleTagLoading (query, callback) {
    if (!query.length) return callback();

    fetch(this.getAjaxUrl(), {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        _token: window.appData.user.token,
        query: query
      })
    }).then((response) => {
      return response.json();
    }).then((results) => {
      callback(results);
    }).catch(() => {
      callback();
    });
  }

  getAjaxUrl () {
    return this.$el.dataset.tagSearch === 'tags'
      ? window.appData.routes.ajax.searchTags
      : window.appData.routes.ajax.searchLists;
  }
}
