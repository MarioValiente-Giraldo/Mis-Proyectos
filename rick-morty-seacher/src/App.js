    import createSearcher from "./helpers/seacher";
import createSearcherWithDebounce from "./helpers/searcherWithDebounce";

    export default function createApp() {
        const searcher = createSearcher();
        const seacherDebounce = createSearcherWithDebounce();
        return searcher;
    }
