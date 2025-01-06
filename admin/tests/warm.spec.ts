import { expect, test } from "@playwright/test";

test("page warm", async ({ browser }) => {
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "session",
      domain: "16.163.41.52",
      path: "/",
      value:
        "FUIwlgJiC0CMAeAwAtgQzAOwJJTvAEAK4DOApgE4arKmmoTKYEZgDGA1lTXQ04sQBdUAkgAB4AKEwA3MANIBhAPYRS8AODF6AM1TEI8AHCqADkuJyAghAjlSxYvABEAFUsApAOYBVWADYAJkIALQAlAAVLQgBlAHUAGQwAWXgANQARAQALAHcACQB2QjyQd2084NIBJXZSDABPUQAA0nr3LJAAcVYwAHkwdyxvAC8sWAA5AYBOADpW92GIWKw%2BgazggNTCCAUsYixkABssnaw-JJdWYaT0gEUABnGAKySAZnH6nMgADXHD1kOUxMwV2fhW93gWAw9xmAFEQOkQC5iAB9AAsAniBW0LmkCnGijAAEd3Kg8goAEKEQ4uNEAMV6sNCsUOSVC7nu308lgAHPAANAmCiMBxgJQYYgADJmklQnjqAhRgmEst4GCVQgE8AAqPRGOriIQTCZDmAKCi7GZyFqAJCkCByFEqCCOG3EeoYVhOmyOAAwdkESjs3pdAvtjrsIGEagA8IbjabzaxxdowJ54ABYTzUUgotCYIRMfnuwSkZAWpSHNTFwggFGoVjJwgYLXak3CbRB8uoDAYJTN1hlhXwAAIShy6p7fYHQ5bkgdrAEYqo5Hq8BjAf75EHKOTGFT6fw%2Boo2lokmThyri%2BXAq%2B2VsqByp7UhjvJ3Ij-rCfqdG2ciMJAUKi8Ymma5DwDahxKJ4mAolB6a%2BnKCq7imabwIh8otkqdDblkmY0MgIBJqh6YZgRRHkNhqC4euIGJpRlpBlqMaqIWhwolGjbUSqxhVOg7GeIQPYQD2OqsfxKKCcJPZUTRGZCuQYoQBapBWq2SFYYx1ocQ2rDcVqAAoGmKlpipSRgIkYPAADYxkqWpklCRZMlkNRrB4QAaOR5qmTpXEflqAC43kMapTF%2BXpAWye5mbuT28r2Ux8AGXFGAJb5rk0RupBxeQ6Vhda8AeXYuX5Q5mUxTGb4PjkiWFR51UfrVGU4TFGZ2Dk1HKaZsV2A6JkFcxvkQOOGBQfQ64CB%2BEqnqFakaGoJhgAG8AABgBPcARonAsDQAEPIuPcaIAFyvPcx2bTMPJTK8wRAA",
    },
  ]);
  const page = await context.newPage();

  await page.goto("/");
  await page.click("text=游戏管理");
  await page.click("text=赔率限制");
  await page.click("text=退水设置");
  await page.click("text=供应商设置");
  await page.click("text=维护设置");
  await expect(page).toHaveURL("/games/maintain");
  // // The new page should contain an h1 with "About"
  // await expect(page.locator("h1")).toContainText("About");
});
