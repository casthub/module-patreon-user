module.exports = class extends window.casthub.elements.user {

    /**
     * Initialize the new Module.
     */
    constructor() {
        super();

        // Set the params for the User Module parent.
        this.icon = 'patreon';
        this.color = '#E85B46';
        this.setLabels({
            patrons: {
                name: 'Patrons',
                label: -1,
                enabled: true,
            },
        });
    }

    /**
     * Run any asynchronous code when the Module is mounted to DOM.
     *
     * @return {Promise}
     */
    async mounted() {
        await super.mounted();

        // Refresh for initial data.
        await this.refresh();

        // Then refresh every 10 seconds.
        setInterval(() => this.refresh(), 10000);
    }

    /**
     * Fetches fresh data from the Patreon API.
     *
     * @return {Promise}
     */
    async refresh() {
        this.avatar = this.identity.image;

        const response = await window.casthub.fetch({
            integration: 'patreon',
            method: 'GET',
            url: 'campaigns',
            data: {
                'fields[campaign]': [
                    'creation_name',
                    'image_url',
                    'patron_count',
                ].join(','),
            },
        });

        if (response.data.length) {
            this.setLabel('patrons', response.data[0].attributes.patron_count);
        }
    }

};
