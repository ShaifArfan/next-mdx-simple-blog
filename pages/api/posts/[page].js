import { getSortedPostsData } from '../../lib/posts';

export default function (req, res) {
  const { page } = req.query;
  const allPostsData = getSortedPostsData();
  const perPage = 9;
  const totalPosts = allPostsData.length;
  const totalPages = totalPosts / perPage;
  const start = (page - 1) * perPage;
  let end = start + perPage;
  if (end > totalPosts) {
    end = totalPosts;
  }

  res.status(200).json({
    currentPage: page,
    perPage,
    totalCount: totalPosts,
    pageCount: totalPages,
    start,
    end,
    posts: allPostsData.slice(start, end),
  });
}
