import { GetStaticPaths, GetStaticProps } from 'next';
import {
  getMarkdownDocumentBySlug,
  getSlugsForMarkdownFiles,
  MarkdownRenderingResult,
  renderMarkdown,
} from '@pellegrims/markdown';
import { ParsedUrlQuery } from 'querystring';
import { SNIPPETS_PATH } from '../../constants';
import BlogArticle from '../../components/blog-article';
import Container from '../../components/container';

interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

export default function Article(props: MarkdownRenderingResult) {
  return (
    <Container>
      <BlogArticle post={props} />
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = getSlugsForMarkdownFiles(SNIPPETS_PATH).map((slug) => ({
    params: { slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<MarkdownRenderingResult> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  const articleMarkdownContent = getMarkdownDocumentBySlug(
    params.slug,
    SNIPPETS_PATH
  );

  const renderedHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderedHTML,
    },
  };
};