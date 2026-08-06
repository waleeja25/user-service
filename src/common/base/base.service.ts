import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  protected constructor(protected readonly repository: Repository<T>) {}

  protected get entityName(): string {
    return this.repository.metadata.name;
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as never,
    });

    if (!entity) {
      throw new NotFoundException(`${this.entityName} not found`);
    }

    return entity;
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findById(id);

    this.repository.merge(entity, data);

    return this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.findById(id);

    await this.repository.remove(entity);
  }
}
