import { InteractionService } from '../../../../app/feature-modules/shared/services/interaction.service';

describe('Interaction service', () => {
    it('should add album ids to album id collection', () => {
        let service: InteractionService = new InteractionService();
        service.albumIds.push(1);
        service.albumIds.push(2);
        expect(service.albumIds.length).toBe(2);
    });
    
});