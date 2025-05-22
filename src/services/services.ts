import { FamiliesService } from './implementations/families.service';
import { HerbariumsService } from './implementations/herbarium.service'
import { PlantImagesService } from './implementations/plant-images.service';
import { PlantsService } from './implementations/plants.service';

export const Services = {
  herbariums: new HerbariumsService(),
  families: new FamiliesService(),
  plants: new PlantsService(),
  plantImages: new PlantImagesService()
};