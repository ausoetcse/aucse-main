export interface AwardAsset {
  year: string;
  image: string;
  link: string;
}

export const awardsData: AwardAsset[] = [
  {
    year: "2021-2022",
    image: "/gallery1.png",
    link: "https://example.com/hackathon-winner"
  },
  {
    year: "2022-2023",
    image: "/gallery2.jpeg",
    link: "https://example.com/ui-design-award"
  },
  {
    year: "2023-2024",
    image: "/gallery_banner.jpg",
    link: "https://example.com/innovative-project"
  },
  {
    year: "2022-2023",
    image: "/student1.webp",
    link: "https://example.com/internship-tcs"
  },
  {
    year: "2024-2025",
    image: "/banner3.jpg",
    link: "https://example.com/google-solution-challenge"
  },
  {
    year: "2021-2024",
    image: "/gallery3.webp",
    link: "https://example.com/github-contribution"
  }
];