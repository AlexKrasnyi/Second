<template>
    <div>
    <div class="page-title">
        <h3>Планування</h3>
        <h4>{{ info.bill | currensy('UAH') }}</h4>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">Категорій поки нема.
        <router-link to="/categories">Додати нову категорію</router-link>
    </p>
    <section v-else>
        <div v-for="categor in categories" :key="categor.id">
        <p>
            <strong>{{ categor.title }}</strong>
            {{categor.spend}} з {{categor.limit}}
        </p>
        <div class="progress" >
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
export default {
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

            return {
                ...categor,
                progressPersent,
                progressColor,
                spend
            }    
        })

        this.loading = false
    }
}
</script>