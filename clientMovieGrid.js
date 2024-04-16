/*    const getFirstMovies = async (u) => {
      const from = 0;
      const to = PAGE_COUNT - 1;
      try {
         if (favorites === false) {
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .ilike('title', `%${searchQuery}%`)
               .order(sortedBy, { ascending: sortOrder })
               .range(from, to);
            if (error) return error;
            else {
               setMovieList(data);

               if (data.length < PAGE_COUNT) {
                  setIsLast(true);
               }
            }
         } else {
            const filteredTitles = await filterFavorites(u);
            const filteredList = filteredTitles.map((favorite) =>
               favorite.movie_title.trim()
            );
            //console.log('fileteredTitles', filteredList);
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .ilike('title', `%${searchQuery}%`)
               .order(sortedBy, { ascending: sortOrder })
               .in('title', filteredList)
               .range(from, to);
            if (error) return error;
            else {
               setMovieList(data);

               if (data.length < PAGE_COUNT) {
                  setIsLast(true);
               }
            }
         }
      } catch (error) {
         console.error('Error getting data from DB:', error);
      }
   };

   const getMoreMovies = async () => {
      setOffset((prev) => prev + 1);
      const from = offset * PAGE_COUNT;
      const to = from + PAGE_COUNT - 1;
      // console.log("Offset:",offset,"from:", from,"to:", to)
      try {
         if (favorites === false) {
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .order(sortedBy, { ascending: sortOrder })
               .range(from, to);
            if (error) return error;
            else {
               return { data, error: null };
            }
         } else {
            const filteredTitles = await filterFavorites(currentUser);
            const filteredList = filteredTitles.map((favorite) =>
               favorite.movie_title.trim()
            );
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .order(sortedBy, { ascending: sortOrder })
               .in('title', filteredList)
               .range(from, to);
            if (error) return error;
            else {
               return { data, error: null };
            }
         }
      } catch (error) {
         console.error('Error getting data from DB:', error);
      }
   };

   const loadMoreMovies = async () => {
      setLoadingMoreMovies(true);
      if (movieList === null) {
         return;
      }
      const { data } = await getMoreMovies(offset, PAGE_COUNT);
      setMovieList((prevMovieList) => [...prevMovieList, ...data]);
      setLoadingMoreMovies(false);
      if (data.length < PAGE_COUNT) {
         setIsLast(true);
      }
   };
 */
/* const filterFavorites = async (u) => {
      const filteredTitles = [];
      if (favoriteType === 'all' || favoriteType === 'fav') {
         const { data: favoritesData, error: favoritesError } = await supabase
            .from('favorites')
            .select('movie_title')
            .match({ user_id: u.user.id });
         if (favoritesError) return favoritesError;
         // console.log(favoritesData);
         setFavoriteList(favoritesData);
         filteredTitles.push(...favoritesData);
      }
      if (favoriteType === 'all' || favoriteType === 'dis') {
         const { data: dislikeData, error: dislikeError } = await supabase
            .from('dislikes')
            .select('movie_title')
            .match({ user_id: u.user.id });
         if (dislikeError) return dislikeError;
         //console.log(dislikeData);
         setDislikeList(dislikeData);
         filteredTitles.push(...dislikeData);
      }
      if (favoriteType === 'all' || favoriteType === 'watch') {
         const { data: watchlistData, error: watchlistError } = await supabase
            .from('watchlist')
            .select('movie_title')
            .match({ user_id: u.user.id });
         if (watchlistError) return watchlistError;
         // console.log(watchlistData);
         setWatchlistList(watchlistData);
         filteredTitles.push(...watchlistData);
      }
      console.log(filteredTitles);
      return filteredTitles;
   }; */

/*    const changeType = (type) => {
      setLoading(true);
      console.log('change type');
      console.log(type);
      setFavoriteType(type);
      setLoading(false);
   }; */

/*    useEffect(() => {
      const fetchUser = async () => {
         const { data: user, error } = await supabase.auth.getUser();
         if (error) {
            console.error('Error fetching user:', error.message);
         } else {
            console.log(user);
            return user;
         }
      };
      fetchUser().then((u) => {
         setCurrentUser(u);
         getFirstMovies(u);
         setLoading(false);
      });
   }, []); */

/*    useEffect(() => {
      const handleDebouncedScroll = debounce(
         () => !isLast && handleScroll(),
         1000
      );
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []); */

/*    useEffect(() => {
      if (isInView) {
         loadMoreMovies();
      }
   }, [isInView]); */

/*    useEffect(() => {
      console.log('FAVORITE TYPE');
      console.log(favoriteType);
      console.log(loading);
      if (!isLoading) {
         setOffset(1);
         getFirstMovies(currentUser);
      }
   }, [isLoading, favoriteType]); */

/* const fetchMovies = async (from, to, genre, sortedBy, sortOrder, searchQuery) => {
      try {
         const response = await fetch(
            `/api/movies?genre=${genre}&sortedBy=${sortedBy}&sortOrder=${sortOrder}&searchQuery=${searchQuery}&from=${from}&to=`
         );
         if (!response.ok) {
            throw new Error('Failed to fetch movies');
         }
         const data = await response.json();
         // Update movie list state with fetched data
         setMovieList(data);
      } catch (error) {
         console.error('Error fetching movies:', error);
      }
   }; */

/*  useEffect(() => {
      const hasScrollbar = window.innerWidth > document.body.clientWidth;
      if (!hasScrollbar && !isLast) {
         loadMoreMovies();
      }
   }, [movieList]);

   useEffect(() => {
      if (isLast) {
         setLoadingMoreMovies(false);
      }
   }, [isLast]); */
