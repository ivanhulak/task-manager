export const sortItemsByStatus = (item1, item2) => {
   if (item1.status > item2.status) return -1;
   if (item1.status < item2.status) return 1;
   return 0;
}
