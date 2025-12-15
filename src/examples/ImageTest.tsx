import { Image } from '@/component';

const ImageTestPage = () => {
  return (
    <div className="bg-beige3 flex min-h-screen max-w-[430px] flex-col gap-4 px-5 py-5">
      <div>
        <div className="text-title2">정상 이미지</div>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/%22Aunt_Bessie%27s%22_home._Washington%2C_D.C.%2C_Oct._29._This_unimposing_apartment_house_will_no_doubt_be_the_scene_of_a_visit_from_the_Duke_and_Duchess_of_Windsor_when_they_come_to_the_National_LCCN2016872497.tif/lossy-page1-144px-thumbnail.tif.jpg"
          className="h-40 w-40 rounded-md"
        />
      </div>
      <div>
        <p className="text-title2">에러 이미지</p>
        <Image src="" alt="에러 이미지" className="h-40 w-40 rounded-md" />
      </div>
    </div>
  );
};

export default ImageTestPage;
