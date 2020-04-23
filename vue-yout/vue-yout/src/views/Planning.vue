<template>
    <div>
    <div class="page-title">
        <h3>{{'Menu_Planning' | localize}}</h3>
        <h4>{{ info.bill | currency('UAH') }}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">{{'Record_categoriesNoYet' | localize}}.
        <router-link to="/categories">{{'Record_editNewCategory' | localize}}</router-link>
    </p>
    <section v-else>
        <div v-for="categor in categories" :key="categor.id">
        <p>
            <strong>{{ categor.title }}</strong>
            {{categor.spend | currency }} з {{categor.limit | currency}}
        </p>
        <div class="progress" v-tooltip="categor.tooltip">
            <div
                class="determinate"
                :class="[categor.progressColor]"
                :style="{ width: categor.progressPersent + '%'}"
            ></div>
        </div>
        </div>
    </section>
    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import currencyFilter from '@/filters/currencyFilter'
export default {
    metaInfo () {
        return {
        title: this.$title('Menu_Planning')
        }
    },
    name: 'planning',
    data: () => ({
        loading: true,
        categories: []
    }),
    computed: {
        ...mapGetters(['info'])
    },
    async mounted () {
        const record =  await this.$store.dispatch('getRecord')
        const categories = await this.$store.dispatch('getCategory')

        this.categories = categories.map(categor => {
            const spend = record
                .filter(i => i.categoryId === categor.id)
                .filter(i => i.type === 'outcome')
                .reduce((total, record) => {
                    return total += +record.amount
                }, 0)

            const persent = 100 * spend / categor.limit
            const progressPersent = persent >100 ? 100 : persent
            const progressColor = persent < 60 
                ? 'green'
                : persent < 100 
                    ? 'yellow'
                    : 'red'

            const tooltipValue = categor.limit - spend
            const tooltip = `${tooltipValue < 0 ? localizeFilter('Planning_exceeded') : localizeFilter('Planning_message_remains')} ${currencyFilter(Math.abs(tooltipValue))}.`

            return {
                ...categor,
                progressPersent,
                progressColor,
                spend,
                tooltip
            }    
        })

        this.loading = false
    }
}
</script>